import { Injectable } from "@nestjs/common";
import type {
  $DrizzleSchema,
  ChallengeActivity as PgChallengeActivity,
  ChallengeActivityResult as PgChallengeActivityResult,
  NewUserRecord as PgNewUserRecord,
  User as PgUser,
  UserRecord as PgUserRecord,
} from "@o/db";
import { UserRecordsTable } from "@o/db";
import { eq } from "drizzle-orm";

import { PgChallengeComposite } from "@/challenge/challenge.repository";
import { DbService } from "@/db/db.service";
import { EntityRepository } from "@/entity";

export type PgUserRecordComposite = PgUserRecord & {
  user: PgUser;
  challenge: PgChallengeComposite;
  activityResult: PgChallengeActivityResult & {
    user: PgUser;
    activity: PgChallengeActivity;
  };
};

@Injectable()
export class UserRecordsRepository
  implements
    EntityRepository<
      typeof UserRecordsTable,
      PgUserRecord,
      PgNewUserRecord,
      PgUserRecordComposite
    >
{
  constructor(private dbService: DbService<typeof $DrizzleSchema>) {}

  private async getRelations(
    id: number
  ): Promise<PgUserRecordComposite | undefined> {
    return await this.dbService.db.query.UserRecordsTable.findFirst({
      where: eq(UserRecordsTable.id, id),
      with: {
        user: true,
        challenge: {
          with: {
            activities: true,
            community: {
              with: {
                owner: true,
              },
            },
          },
        },
        activity: true,
        activityResult: {
          with: {
            user: true,
            activity: true,
          },
        },
      },
    });
  }

  async create(
    newUserRecord: PgNewUserRecord
  ): Promise<PgUserRecordComposite | undefined> {
    const [result] = await this.dbService.db
      .insert(UserRecordsTable)
      .values(newUserRecord)
      .returning();

    const relations = await this.getRelations(result.id);

    return relations ? { ...result, ...relations } : undefined;
  }

  async update(
    updateUserRecordInput: Partial<PgUserRecord> & { id: number }
  ): Promise<PgUserRecordComposite | undefined> {
    const [updatedUserRecord] = await this.dbService.db
      .update(UserRecordsTable)
      .set(updateUserRecordInput)
      .where(eq(UserRecordsTable.id, updateUserRecordInput.id))
      .returning();

    const relations = await this.getRelations(updatedUserRecord.id);

    return relations ? { ...updatedUserRecord, ...relations } : undefined;
  }

  async findById(id: number): Promise<PgUserRecordComposite | undefined> {
    return this.getRelations(id);
  }

  async findByUserId(
    userId: number
  ): Promise<PgUserRecordComposite[] | undefined> {
    const userRecords = await this.dbService.db.query.UserRecordsTable.findMany(
      {
        where: eq(UserRecordsTable.userId, userId),
        with: {
          user: true,
          challenge: {
            with: {
              activities: true,
              community: {
                with: {
                  owner: true,
                },
              },
            },
          },
          activity: true,
          activityResult: {
            with: {
              user: true,
              activity: true,
            },
          },
        },
      }
    );

    if (userRecords.length === 0) {
      return undefined;
    }

    return userRecords;
  }

  async delete(id: number): Promise<boolean> {
    const [deletedUserRecord] = await this.dbService.db
      .delete(UserRecordsTable)
      .where(eq(UserRecordsTable.id, id))
      .returning();

    return !!deletedUserRecord;
  }
}
