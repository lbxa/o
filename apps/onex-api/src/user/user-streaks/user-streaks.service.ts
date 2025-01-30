import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import type {
  $DrizzleSchema,
  NewUserStreak,
  UserStreak as PgUserStreak,
} from "@o/db";
import { UserStreaksTable } from "@o/db";
import dayjs from "dayjs";
import { eq, isNull, lte, or, SQL, sql } from "drizzle-orm";

import { DbService } from "@/db/db.service";
import {
  EntityService,
  EntityType,
  EntityUtils,
  SearchableNumericFields,
} from "@/entity";
import {
  UserStreak as GqlUserStreak,
  UserStreakUpdateInput,
} from "@/types/graphql";
import { UserService } from "@/user/user.service";
import { PgUserStreakComposite } from "@/user/user-streaks/user-streaks.types";
import { encodeGlobalId, validateAndDecodeGlobalId } from "@/utils";
import { InternalServerError, NotFoundError } from "@/utils/errors";

import { UserStreaksRepository } from "./user-streaks.repository";

@Injectable()
export class UserStreaksService
  implements
    EntityService<
      typeof UserStreaksTable,
      PgUserStreak,
      GqlUserStreak,
      PgUserStreakComposite
    >
{
  private static readonly INITIAL_STREAK = 1;
  private static readonly ZERO_STREAK = 0;
  private readonly logger = new Logger(UserStreaksService.name);

  constructor(
    private dbService: DbService<typeof $DrizzleSchema>,
    private userService: UserService,
    private userStreaksRepository: UserStreaksRepository
  ) {}

  public getTypename(): EntityType {
    return "UserStreak";
  }

  public pg2GqlMapper(pgUserStreak: PgUserStreakComposite): GqlUserStreak {
    return {
      ...pgUserStreak,
      id: encodeGlobalId(this.getTypename(), pgUserStreak.id),
      user: this.userService.pg2GqlMapper(pgUserStreak.user),
    };
  }

  findBy(
    _fields: SearchableNumericFields<PgUserStreakComposite, "id" | "userId">
  ): Promise<GqlUserStreak[]> {
    throw new Error("Method not implemented.");
  }

  async create(newUserStreak: NewUserStreak): Promise<GqlUserStreak> {
    const userStreak = await this.userStreaksRepository.create(newUserStreak);

    if (!userStreak) {
      throw new InternalServerError("Failed to create user streak");
    }

    return this.pg2GqlMapper(userStreak);
  }

  async findById(id: number): Promise<GqlUserStreak> {
    const userStreak = await this.userStreaksRepository.findById(id);

    if (!userStreak) {
      throw new NotFoundError(`UserStreak with id ${id} not found`);
    }

    return this.pg2GqlMapper(userStreak);
  }

  async findByUserId(userId: number): Promise<GqlUserStreak> {
    const userStreak = await this.dbService.db.query.UserStreaksTable.findFirst(
      {
        where: eq(UserStreaksTable.userId, userId),
        with: { user: true },
      }
    );

    if (!userStreak) {
      throw new NotFoundError(`UserStreak with userId ${userId} not found`);
    }

    return this.pg2GqlMapper(userStreak);
  }

  async update(
    updateUserStreakInput: UserStreakUpdateInput
  ): Promise<GqlUserStreak> {
    const { id: globalId, ...updates } = updateUserStreakInput;
    const id = validateAndDecodeGlobalId(globalId, this.getTypename());

    const filteredUpdates = EntityUtils.filterNullValues(updates);
    const updatedUserStreak = await this.userStreaksRepository.update({
      ...filteredUpdates,
      id,
    });

    if (!updatedUserStreak) {
      throw new NotFoundError(`UserStreak with id ${id} not found`);
    }

    return this.pg2GqlMapper(updatedUserStreak);
  }

  async delete(id: string): Promise<boolean> {
    const decodedId = validateAndDecodeGlobalId(id, this.getTypename());

    // eslint-disable-next-line drizzle/enforce-delete-with-where
    return this.userStreaksRepository.delete(decodedId);
  }

  private calculateNewStreakValues(
    currentStreak: number,
    longestStreak: number,
    dayDifference: number
  ): Pick<PgUserStreak, "currentStreak" | "longestStreak"> | null {
    if (dayDifference === 1) {
      const newCurrentStreak = currentStreak + 1;
      return {
        currentStreak: newCurrentStreak,
        longestStreak: Math.max(newCurrentStreak, longestStreak),
      };
    }

    if (dayDifference > 1 || dayDifference === 0) {
      return {
        currentStreak: UserStreaksService.INITIAL_STREAK,
        longestStreak,
      };
    }

    return null; // No changes needed for same-day activities
  }

  /**
   * Increments the streak for a user if the activity was completed on the next day
   * following date of the last activity.
   *
   * If the user does not have a streak, it creates a new one.
   * @param userId - The ID of the user
   */
  async incrementStreak(userId: number) {
    try {
      const existingStreak = await this.findByUserId(userId);

      if (!existingStreak.updatedAt) {
        throw new InternalServerError(
          `Missing updatedAt for user streak with userId ${userId}`
        );
      }

      const lastActivityDate = dayjs(existingStreak.updatedAt).startOf("day");
      const today = dayjs().startOf("day");
      const dayDifference = today.diff(lastActivityDate, "day");

      const newStreakValues = this.calculateNewStreakValues(
        existingStreak.currentStreak,
        existingStreak.longestStreak ?? 0,
        dayDifference
      );

      if (newStreakValues) {
        await this.update({
          id: existingStreak.id,
          ...newStreakValues,
        });
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        await this.create({
          userId,
          currentStreak: UserStreaksService.INITIAL_STREAK,
          longestStreak: UserStreaksService.INITIAL_STREAK,
        });
      } else {
        throw error;
      }
    }
  }

  /**
   * At the strike of midnight, reset the streak for users who have not
   * completed an activity in the last 24 hours.
   *
   * Cinderella needs her slippers
   *
   * TODO add distributed locking mechanism to this function
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCinderella() {
    const yesterday = dayjs().subtract(1, "day").endOf("day").toDate();
    const longestStreakSQL: SQL<number> = sql<number>`
      GREATEST(
        COALESCE(${UserStreaksTable.longestStreak}, 0),
        ${UserStreaksTable.currentStreak}
      )
    `;

    try {
      const updatedStreaks = await this.dbService.db
        .update(UserStreaksTable)
        .set({
          currentStreak: UserStreaksService.ZERO_STREAK,
          longestStreak: longestStreakSQL,
        })
        .where(
          or(
            lte(UserStreaksTable.updatedAt, yesterday),
            isNull(UserStreaksTable.updatedAt)
          )
        )
        .returning();

      this.logger.log(`Reset streaks for ${updatedStreaks.length} users`);
    } catch (error) {
      this.logger.error("Failed to reset streaks", error);
    }
  }
}
