import { Injectable } from "@nestjs/common";
import type {
  $DrizzleSchema,
  ChallengeActivityResult as PgChallengeActivityResult,
  NewChallengeActivityResult,
} from "@o/db";
import { ChallengeActivityResultsTable } from "@o/db";
import { eq } from "drizzle-orm";

import { DbService } from "@/db/db.service";
import { EntityRepository } from "@/entity";

import { PgChallengeActivityResultComposite } from "./challenge-activity-results.types";

@Injectable()
export class ChallengeActivityResultsRepository
  implements
    EntityRepository<
      typeof ChallengeActivityResultsTable,
      PgChallengeActivityResult,
      NewChallengeActivityResult,
      PgChallengeActivityResultComposite
    >
{
  constructor(private dbService: DbService<typeof $DrizzleSchema>) {}

  private async getRelations(
    id: number
  ): Promise<PgChallengeActivityResultComposite | undefined> {
    // eslint-disable-next-line @stylistic/js/max-len
    return await this.dbService.db.query.ChallengeActivityResultsTable.findFirst(
      {
        where: eq(ChallengeActivityResultsTable.id, id),
        with: {
          user: true,
          activity: {
            with: {
              challenge: {
                with: {
                  community: {
                    with: {
                      owner: true,
                    },
                  },
                },
              },
            },
          },
        },
      }
    );
  }

  async create(
    newChallengeActivityResult: NewChallengeActivityResult
  ): Promise<PgChallengeActivityResultComposite | undefined> {
    const [result] = await this.dbService.db
      .insert(ChallengeActivityResultsTable)
      .values(newChallengeActivityResult)
      .returning();

    const relations = await this.getRelations(result.id);

    return relations ? { ...result, ...relations } : undefined;
  }

  async update(
    updateChallengeActivityResultInput: Partial<PgChallengeActivityResult> & {
      id: number;
    }
  ): Promise<PgChallengeActivityResultComposite | undefined> {
    const [updatedChallengeActivityResult] = await this.dbService.db
      .update(ChallengeActivityResultsTable)
      .set(updateChallengeActivityResultInput)
      .where(
        eq(
          ChallengeActivityResultsTable.id,
          updateChallengeActivityResultInput.id
        )
      )
      .returning();

    const relations = await this.getRelations(
      updatedChallengeActivityResult.id
    );

    return relations
      ? { ...updatedChallengeActivityResult, ...relations }
      : undefined;
  }

  async findBy(
    fields: Partial<
      Pick<
        PgChallengeActivityResult,
        "id" | "userId" | "challengeId" | "activityId"
      >
    >,
    args?: { first: number; after: number }
  ): Promise<PgChallengeActivityResultComposite[]> {
    const challengeActivityResults =
      await this.dbService.db.query.ChallengeActivityResultsTable.findMany({
        where: (challengeActivityResults, { and, eq }) =>
          and(
            ...Object.entries(fields).map(([k, v]) =>
              eq(
                challengeActivityResults[
                  k as keyof typeof challengeActivityResults
                ],
                v
              )
            )
          ),
        offset: args?.after,
        limit: args?.first,
        with: {
          user: true,
          activity: {
            with: {
              challenge: {
                with: {
                  community: true,
                },
              },
            },
          },
        },
        orderBy: (challengeActivityResults, { desc }) => [
          desc(challengeActivityResults.createdAt),
        ],
      });

    return challengeActivityResults;
  }

  async findById(
    id: number
  ): Promise<PgChallengeActivityResultComposite | undefined> {
    const challengeActivityResults = await this.findBy({ id });

    return challengeActivityResults.length > 0
      ? challengeActivityResults[0]
      : undefined;
  }

  async delete(id: number): Promise<boolean> {
    const [deletedChallengeActivityResult] = await this.dbService.db
      .delete(ChallengeActivityResultsTable)
      .where(eq(ChallengeActivityResultsTable.id, id))
      .returning();

    return !!deletedChallengeActivityResult;
  }
}
