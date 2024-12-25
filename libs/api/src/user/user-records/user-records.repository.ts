import { Injectable } from "@nestjs/common";
import type {
  NewUserRecord as PgNewUserRecord,
  User as PgUser,
  UserRecord as PgUserRecord,
} from "@o/db";
import { UserRecordsTable, UsersTable } from "@o/db";
import * as schema from "@o/db";
import { eq } from "drizzle-orm";

import { DbService } from "../../db/db.service";
import { EntityRepository } from "../../entity";

@Injectable()
export class UserRecordsRepository
  implements EntityRepository<typeof UserRecordsTable>
{
  constructor(private dbService: DbService<typeof schema>) {}

  async create(
    newUserRecord: PgNewUserRecord
  ): Promise<(PgUserRecord & { user: PgUser }) | undefined> {
    const [result] = await this.dbService.db
      .insert(UserRecordsTable)
      .values(newUserRecord)
      .returning();

    const user = await this.dbService.db.query.UsersTable.findFirst({
      where: eq(UsersTable.id, result.userId),
    });

    return user ? { ...result, user } : undefined;
  }

  async update(
    updateUserRecordInput: Partial<PgUserRecord> & { id: number }
  ): Promise<(PgUserRecord & { user: PgUser }) | undefined> {
    const [updatedUserRecord] = await this.dbService.db
      .update(UserRecordsTable)
      .set(updateUserRecordInput)
      .where(eq(UserRecordsTable.id, updateUserRecordInput.id))
      .returning();

    const user = await this.dbService.db.query.UsersTable.findFirst({
      where: eq(UsersTable.id, updatedUserRecord.userId),
    });

    return user ? { ...updatedUserRecord, user } : undefined;
  }

  async findById(
    id: number
  ): Promise<(PgUserRecord & { user: PgUser }) | undefined> {
    const userRecord = await this.dbService.db.query.UserRecordsTable.findFirst(
      {
        where: eq(UserRecordsTable.id, id),
        with: {
          user: true,
        },
      }
    );

    return userRecord;
  }

  async findByUserId(
    userId: number
  ): Promise<(PgUserRecord & { user: PgUser }) | undefined> {
    const userRecord = await this.dbService.db.query.UserRecordsTable.findFirst(
      {
        where: eq(UserRecordsTable.userId, userId),
        with: {
          user: true,
        },
      }
    );

    return userRecord;
  }

  async delete(id: number): Promise<boolean> {
    const [deletedUserRecord] = await this.dbService.db
      .delete(UserRecordsTable)
      .where(eq(UserRecordsTable.id, id))
      .returning();

    return !!deletedUserRecord;
  }
}
