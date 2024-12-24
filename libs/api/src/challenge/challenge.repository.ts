import { Injectable } from "@nestjs/common";
import type {
  Challenge as PgChallenge,
  ChallengeActivity as PgChallengeActivity,
  NewChallenge as PgNewChallenge,
} from "@o/db";
import { ChallengeActivitiesTable, ChallengesTable } from "@o/db";
import * as schema from "@o/db";
import { eq } from "drizzle-orm";

import { DbService } from "../db/db.service";
import { EntityRepository } from "../entity";

@Injectable()
export class ChallengeRepository
  implements EntityRepository<typeof ChallengesTable>
{
  constructor(private dbService: DbService<typeof schema>) {}

  async create(
    newChallenge: PgNewChallenge
  ): Promise<
    (PgChallenge & { activities: PgChallengeActivity[] }) | undefined
  > {
    const [result] = await this.dbService.db
      .insert(ChallengesTable)
      .values(newChallenge)
      .returning();

    const activities =
      await this.dbService.db.query.ChallengeActivitiesTable.findMany({
        where: eq(ChallengeActivitiesTable.challengeId, result.id),
      });

    return activities ? { ...result, activities } : undefined;
  }

  async update(
    updateChallengeInput: Partial<PgChallenge> & { id: number }
  ): Promise<
    (PgChallenge & { activities: PgChallengeActivity[] }) | undefined
  > {
    const [updatedChallenge] = await this.dbService.db
      .update(ChallengesTable)
      .set(updateChallengeInput)
      .where(eq(ChallengesTable.id, updateChallengeInput.id))
      .returning();

    const activities =
      await this.dbService.db.query.ChallengeActivitiesTable.findMany({
        where: eq(ChallengeActivitiesTable.challengeId, updatedChallenge.id),
      });

    return activities ? { ...updatedChallenge, activities } : undefined;
  }

  async delete(id: number): Promise<boolean> {
    const [deletedChallenge] = await this.dbService.db
      .delete(ChallengesTable)
      .where(eq(ChallengesTable.id, id))
      .returning();

    return !!deletedChallenge;
  }

  async findById(
    id: number
  ): Promise<
    (PgChallenge & { activities: PgChallengeActivity[] }) | undefined
  > {
    const challenge = await this.dbService.db.query.ChallengesTable.findFirst({
      where: eq(ChallengesTable.id, id),
      with: { activities: true },
    });

    return challenge;
  }

  async findByCommunityId(
    communityId: number
  ): Promise<(PgChallenge & { activities: PgChallengeActivity[] })[]> {
    const challenges = await this.dbService.db.query.ChallengesTable.findMany({
      where: eq(ChallengesTable.communityId, communityId),
      with: { activities: true },
    });

    return challenges;
  }
}
