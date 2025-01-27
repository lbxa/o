import { Injectable } from "@nestjs/common";
import type {
  $DrizzleSchema,
  NewUserStreak as PgNewUserStreak,
  User as PgUser,
  UserStreak as PgUserStreak,
} from "@o/db";
import { UsersTable, UserStreaksTable } from "@o/db";
import { eq, inArray } from "drizzle-orm";

import { DbService } from "@/db/db.service";
import { EntityRepository, FindByArgs } from "@/entity";
import { PgUserStreakComposite } from "@/user/user-streaks/user-streaks.types";

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
    fields: Partial<
      Record<keyof Pick<PgUserStreak, "id" | "userId">, number | number[]>
    > = {},
    args?: FindByArgs
  ): Promise<PgUserStreakComposite[]> {
    const userStreaks = await this.dbService.db.query.UserStreaksTable.findMany(
      {
        where: Object.keys(fields).length
          ? (userStreaks, { and, eq }) =>
              and(
                ...Object.entries(fields).map(([k, v]) =>
                  Array.isArray(v)
                    ? inArray(userStreaks[k as keyof typeof userStreaks], v)
                    : eq(userStreaks[k as keyof typeof userStreaks], v)
                )
              )
          : undefined,
        limit: args?.limit,
        offset: args?.offset,
        with: { user: true },
      }
    );

    return userStreaks;
  }

  async findAll(): Promise<PgUserStreakComposite[]> {
    return await this.findBy();
  }

  async findById(id: number): Promise<PgUserStreakComposite | undefined> {
    const [userStreak] = await this.findBy({ id });

    return userStreak;
  }

  async findByUserId(
    userId: number
  ): Promise<PgUserStreakComposite | undefined> {
    const [userStreak] = await this.findBy({ userId });

    return userStreak;
  }
}
