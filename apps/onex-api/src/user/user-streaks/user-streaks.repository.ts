import { Injectable } from "@nestjs/common";
import type {
  $DrizzleSchema,
  NewUserStreak as PgNewUserStreak,
  User as PgUser,
  UserStreak as PgUserStreak,
} from "@o/db";
import { UsersTable, UserStreaksTable } from "@o/db";
import { eq } from "drizzle-orm";

import { DbService } from "@/db/db.service";
import { EntityRepository } from "@/entity";

@Injectable()
export class UserStreaksRepository
  implements EntityRepository<typeof UserStreaksTable>
{
  constructor(private dbService: DbService<typeof $DrizzleSchema>) {}

  async create(
    newUserStreak: PgNewUserStreak
  ): Promise<(PgUserStreak & { user: PgUser }) | undefined> {
    const [result] = await this.dbService.db
      .insert(UserStreaksTable)
      .values(newUserStreak)
      .returning();

    const user = await this.dbService.db.query.UsersTable.findFirst({
      where: eq(UsersTable.id, result.userId),
    });

    return user ? { ...result, user } : undefined;
  }

  async update(
    updateUserStreakInput: Partial<PgUserStreak> & { id: number }
  ): Promise<(PgUserStreak & { user: PgUser }) | undefined> {
    const [updatedUserStreak] = await this.dbService.db
      .update(UserStreaksTable)
      .set(updateUserStreakInput)
      .where(eq(UserStreaksTable.id, updateUserStreakInput.id))
      .returning();

    const user = await this.dbService.db.query.UsersTable.findFirst({
      where: eq(UsersTable.id, updatedUserStreak.userId),
    });

    return user ? { ...updatedUserStreak, user } : undefined;
  }

  async delete(id: number): Promise<boolean> {
    const [deletedUserStreak] = await this.dbService.db
      .delete(UserStreaksTable)
      .where(eq(UserStreaksTable.id, id))
      .returning();

    return !!deletedUserStreak;
  }

  async findBy(
    fields: Partial<Pick<PgUserStreak, "id" | "userId">>
  ): Promise<(PgUserStreak & { user: PgUser })[]> {
    const userStreaks = await this.dbService.db.query.UserStreaksTable.findMany(
      {
        where: (userStreaks, { and, eq }) =>
          and(
            ...Object.entries(fields).map(([k, v]) =>
              eq(userStreaks[k as keyof typeof userStreaks], v)
            )
          ),
        with: { user: true },
      }
    );

    return userStreaks;
  }

  async findById(
    id: number
  ): Promise<(PgUserStreak & { user: PgUser }) | undefined> {
    const userStreak = await this.dbService.db.query.UserStreaksTable.findFirst(
      {
        where: eq(UserStreaksTable.id, id),
        with: { user: true },
      }
    );

    return userStreak;
  }

  async findByUserId(userId: number): Promise<PgUserStreak | undefined> {
    const userStreak = await this.dbService.db.query.UserStreaksTable.findFirst(
      {
        where: eq(UserStreaksTable.userId, userId),
        with: { user: true },
      }
    );

    return userStreak;
  }
}
