import { Injectable } from "@nestjs/common";
import type {
  NewUserStreak,
  User as PgUser,
  UserStreak as PgUserStreak,
} from "@o/db";
import { UserStreaksTable } from "@o/db";
import * as schema from "@o/db";
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
}
