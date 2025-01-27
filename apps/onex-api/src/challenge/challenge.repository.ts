import { Injectable } from "@nestjs/common";
import type {
  Challenge as PgChallenge,
  NewChallenge as PgNewChallenge,
} from "@o/db";
import { $DrizzleSchema, ChallengesTable } from "@o/db";
import { eq } from "drizzle-orm";

import { DbService } from "../db/db.service";
import { EntityRepository } from "../entity";
import { PgChallengeComposite } from "./challenge.types";

@Injectable()
export class ChallengeRepository
  implements
    EntityRepository<
      typeof ChallengesTable,
      PgChallenge,
      PgNewChallenge,
      PgChallengeComposite
    >
{
  constructor(private dbService: DbService<typeof $DrizzleSchema>) {}

  private async getRelations(
    id: number
  ): Promise<PgChallengeComposite | undefined> {
    return await this.dbService.db.query.ChallengesTable.findFirst({
      where: eq(ChallengesTable.id, id),
      with: {
        activities: {
          with: {
            challenge: {
              with: {
                // TODO need to fix as this is not intended
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
          },
        },
        community: {
          with: {
            owner: true,
          },
        },
      },
    });
  }

  async create(
    newChallenge: PgNewChallenge
  ): Promise<PgChallengeComposite | undefined> {
    const [result] = await this.dbService.db
      .insert(ChallengesTable)
      .values(newChallenge)
      .returning();

    const relations = await this.getRelations(result.id);

    return relations ? { ...result, ...relations } : undefined;
  }

  async update(
    updateChallengeInput: Partial<PgChallenge> & { id: number }
  ): Promise<PgChallengeComposite | undefined> {
    const [updatedChallenge] = await this.dbService.db
      .update(ChallengesTable)
      .set(updateChallengeInput)
      .where(eq(ChallengesTable.id, updateChallengeInput.id))
      .returning();

    if (!updatedChallenge) {
      return undefined;
    }

    const relations = await this.getRelations(updatedChallenge.id);

    return relations ? { ...updatedChallenge, ...relations } : undefined;
  }

  async delete(id: number): Promise<boolean> {
    const [deletedChallenge] = await this.dbService.db
      .delete(ChallengesTable)
      .where(eq(ChallengesTable.id, id))
      .returning();

    return !!deletedChallenge;
  }

  async findBy(
    fields: Partial<Pick<PgChallenge, "id" | "communityId">>,
    args?: { first: number; after: number }
  ): Promise<PgChallengeComposite[]> {
    const challenges = await this.dbService.db.query.ChallengesTable.findMany({
      where: (challenges, { and, eq }) =>
        and(
          ...Object.entries(fields).map(([k, v]) =>
            eq(challenges[k as keyof typeof challenges], v)
          )
        ),
      offset: args?.after,
      limit: args?.first,
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
      orderBy: (challenges, { desc }) => [desc(challenges.createdAt)],
    });

    return challenges;
  }

  async findById(id: number): Promise<PgChallengeComposite | undefined> {
    const relations = await this.getRelations(id);

    return relations ? { ...relations } : undefined;
  }

  async findByCommunityId(
    communityId: number
  ): Promise<PgChallengeComposite[]> {
    return this.findBy({ communityId });
  }
}
