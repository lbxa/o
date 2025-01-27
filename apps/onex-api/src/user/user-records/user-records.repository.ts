import { Injectable } from "@nestjs/common";
import type {
  $DrizzleSchema,
  NewUserRecord as PgNewUserRecord,
  UserRecord as PgUserRecord,
} from "@o/db";
import { UserRecordsTable } from "@o/db";
import { eq, inArray } from "drizzle-orm";

import { DbService } from "@/db/db.service";
import { EntityRepository, FindByArgs } from "@/entity";

import type { PgUserRecordComposite } from "./user-records.types";

@Injectable()
export class UserRecordsRepository
  implements
    EntityRepository<
      typeof UserRecordsTable,
      PgUserRecord,
      PgNewUserRecord,
      PgUserRecordComposite,
      "id" | "userId" | "challengeId" | "activityId" | "activityResultId"
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
            activities: {
              with: {
                challenge: true,
              },
            },
            community: {
              with: {
                owner: true,
              },
            },
          },
        },
        activityResult: {
          with: {
            user: true,
            activity: {
              with: {
                challenge: true,
              },
            },
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

  async findBy(
    fields: Partial<
      Record<
        keyof Pick<
          PgUserRecord,
          "id" | "userId" | "challengeId" | "activityId" | "activityResultId"
        >,
        number | number[]
      >
    > = {},
    args?: FindByArgs
  ): Promise<PgUserRecordComposite[]> {
    const userRecords = await this.dbService.db.query.UserRecordsTable.findMany(
      {
        where: Object.keys(fields).length
          ? (userRecords, { and, eq }) =>
              and(
                ...Object.entries(fields).map(([k, v]) =>
                  Array.isArray(v)
                    ? inArray(userRecords[k as keyof typeof userRecords], v)
                    : eq(userRecords[k as keyof typeof userRecords], v)
                )
              )
          : undefined,
        limit: args?.limit,
        offset: args?.offset,
        with: {
          user: true,
          challenge: {
            with: {
              activities: {
                with: {
                  challenge: true,
                },
              },
              community: {
                with: {
                  owner: true,
                },
              },
            },
          },
          activityResult: {
            with: {
              user: true,
              activity: {
                with: {
                  challenge: true,
                },
              },
            },
          },
        },
      }
    );

    return userRecords;
  }

  async findById(id: number): Promise<PgUserRecordComposite | undefined> {
    const userRecords = await this.findBy({ id });

    if (!userRecords || userRecords.length === 0) {
      return undefined;
    }

    return userRecords[0];
  }

  async delete(id: number): Promise<boolean> {
    const [deletedUserRecord] = await this.dbService.db
      .delete(UserRecordsTable)
      .where(eq(UserRecordsTable.id, id))
      .returning();

    return !!deletedUserRecord;
  }
}
