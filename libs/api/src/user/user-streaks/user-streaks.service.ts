import { Injectable } from "@nestjs/common";
import type {
  NewUserStreak,
  User as PgUser,
  UserStreak as PgUserStreak,
} from "@o/db";
import { UserStreaksTable } from "@o/db";
import * as schema from "@o/db";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";

import { DbService } from "../../db/db.service";
import { EntityService } from "../../entity";
import {
  UserStreak as GqlUserStreak,
  UserStreakUpdateInput,
} from "../../types/graphql";
import { encodeGlobalId, validateAndDecodeGlobalId } from "../../utils";
import { InternalServerError, NotFoundError } from "../../utils/errors";
import { UserService } from "../user.service";
import { UserStreaksRepository } from "./user-streaks.repository";

@Injectable()
export class UserStreaksService
  implements EntityService<typeof UserStreaksTable, PgUserStreak, GqlUserStreak>
{
  private static readonly INITIAL_STREAK = 1;

  constructor(
    private dbService: DbService<typeof schema>,
    private userService: UserService,
    private userStreaksRepository: UserStreaksRepository
  ) {}

  public getTypename(): string {
    return "UserStreak";
  }

  public pg2GqlMapper(
    pgUserStreak: PgUserStreak & { user: PgUser }
  ): GqlUserStreak {
    return {
      ...pgUserStreak,
      id: encodeGlobalId("UserStreak", pgUserStreak.id),
      user: this.userService.pg2GqlMapper(pgUserStreak.user),
    };
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
    const id = validateAndDecodeGlobalId(globalId, "UserStreak");

    const updatedUserStreak = await this.userStreaksRepository.update({
      id,
      ...updates,
    });

    if (!updatedUserStreak) {
      throw new NotFoundError(`UserStreak with id ${id} not found`);
    }

    return this.pg2GqlMapper(updatedUserStreak);
  }

  async delete(id: string): Promise<boolean> {
    const decodedId = validateAndDecodeGlobalId(id, "UserStreak");

    // eslint-disable-next-line drizzle/enforce-delete-with-where
    return this.userStreaksRepository.delete(decodedId);
  }

  private calculateNewStreakValues(
    currentStreak: number,
    longestStreak: number,
    dayDifference: number
  ) {
    if (dayDifference === 1) {
      const newCurrentStreak = currentStreak + 1;
      return {
        currentStreak: newCurrentStreak,
        longestStreak: Math.max(newCurrentStreak, longestStreak),
      };
    }

    if (dayDifference > 1) {
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
}
