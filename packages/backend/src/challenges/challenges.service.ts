import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import {
  Challenge as PgChallenge,
  ChallengeActivitiesTable,
  ChallengeActivity as PgChallengeActivity,
  ChallengeMembershipsTable,
  ChallengesTable,
  CommunityMembershipsTable,
  NewChallenge,
  NewChallengeActivity,
} from "@o/db";
import { and, eq } from "drizzle-orm";

import { DbService } from "../db/db.service";
import { EntityService } from "../entity/entity-service";
import {
  Challenge as GqlChallenge,
  ChallengeCadence,
  ChallengeMode,
} from "../types/graphql";
import { encodeGlobalId, mapToEnum } from "../utils";
import { ChallengeActivitiesService } from "./challenge-activity";

@Injectable()
export class ChallengesService
  implements EntityService<typeof ChallengesTable, PgChallenge, GqlChallenge>
{
  constructor(
    private challengeActivitiesService: ChallengeActivitiesService,
    private dbService: DbService
  ) {}

  public getTypename(): string {
    return "Challenge";
  }

  public pg2GqlMapper(
    challenge: PgChallenge & {
      activities: PgChallengeActivity[];
    }
  ): GqlChallenge {
    return {
      ...challenge,
      mode: mapToEnum(ChallengeMode, challenge.mode),
      cadence: mapToEnum(ChallengeCadence, challenge.cadence),
      activity: this.challengeActivitiesService.pg2GqlMapper(
        challenge.activities[0]
      ),
      id: encodeGlobalId("Challenge", challenge.id),
    };
  }

  async findById(id: number): Promise<GqlChallenge> {
    const challenge = await this.dbService.db.query.ChallengesTable.findFirst({
      where: eq(ChallengesTable.id, id),
      with: {
        activities: true,
      },
    });

    if (!challenge) {
      throw new NotFoundException(`Challenge with id ${id} not found`);
    }

    return this.pg2GqlMapper(challenge);
  }

  async findAll(): Promise<GqlChallenge[]> {
    const allChallenges =
      await this.dbService.db.query.ChallengesTable.findMany({
        with: { activities: true },
      });

    return allChallenges.map((challenge) => this.pg2GqlMapper(challenge));
  }

  async findUserChallenges(userId: number): Promise<GqlChallenge[]> {
    const challenges = await this.dbService.db
      .select({
        challenge: ChallengesTable,
        activities: ChallengeActivitiesTable,
      })
      .from(ChallengeMembershipsTable)
      .innerJoin(
        ChallengesTable,
        eq(ChallengesTable.id, ChallengeMembershipsTable.challengeId)
      )
      .innerJoin(
        ChallengeActivitiesTable,
        eq(ChallengesTable.id, ChallengeActivitiesTable.challengeId)
      )
      .where(eq(ChallengeMembershipsTable.userId, userId));

    return challenges.map((challenge) => ({
      ...this.pg2GqlMapper({
        ...challenge.challenge,
        activities: [challenge.activities], // for now one-to-one
      }),
    }));
  }

  async findCommunityChallenges(communityId: number): Promise<GqlChallenge[]> {
    const challenges = await this.dbService.db.query.ChallengesTable.findMany({
      where: eq(ChallengesTable.communityId, communityId),
      with: { activities: true },
    });

    return challenges.map((challenge) => ({
      ...this.pg2GqlMapper({
        ...challenge,
        activities: challenge.activities, // for now one-to-one
      }),
    }));
  }

  async create(
    challengeInput: NewChallenge,
    activityInput: Omit<NewChallengeActivity, "challengeId">,
    userId: number
  ): Promise<GqlChallenge> {
    const isAdmin =
      await this.dbService.db.query.CommunityMembershipsTable.findFirst({
        where: and(
          eq(CommunityMembershipsTable.userId, userId),
          eq(CommunityMembershipsTable.communityId, challengeInput.communityId),
          eq(CommunityMembershipsTable.isAdmin, true)
        ),
      });

    if (!isAdmin) {
      throw new ForbiddenException(
        "Only community admins can create challenges"
      );
    }

    const [challenge] = await this.dbService.db
      .insert(ChallengesTable)
      .values({ ...challengeInput })
      .returning();

    const challengeActivity = await this.challengeActivitiesService.create({
      ...activityInput,
      challengeId: challenge.id,
    });

    if (!challengeActivity) {
      throw new InternalServerErrorException(
        "Failed to create challenge activity"
      );
    }

    return this.pg2GqlMapper({
      ...challenge,
      activities: [challengeActivity],
    });
  }

  async update(
    id: number,
    challengeInput: Partial<NewChallenge>
  ): Promise<GqlChallenge> {
    const [updatedChallenge] = await this.dbService.db
      .update(ChallengesTable)
      .set(challengeInput)
      .where(eq(ChallengesTable.id, id))
      .returning();

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!updatedChallenge) {
      throw new NotFoundException(`Challenge with id ${id} not found`);
    }

    const challengeActivity =
      await this.dbService.db.query.ChallengeActivitiesTable.findFirst({
        where: eq(ChallengeActivitiesTable.challengeId, updatedChallenge.id),
      });

    if (!challengeActivity) {
      throw new InternalServerErrorException(
        "Failed to find challenge activity"
      );
    }

    return this.pg2GqlMapper({
      ...updatedChallenge,
      activities: [challengeActivity],
    });
  }

  async remove(id: number, userId: number): Promise<boolean> {
    // Verify that the user is an admin of the community
    const challenge = await this.dbService.db.query.ChallengesTable.findFirst({
      where: eq(ChallengesTable.id, id),
    });

    if (!challenge) {
      throw new NotFoundException(`Challenge with id ${id} not found`);
    }

    const isAdmin =
      await this.dbService.db.query.CommunityMembershipsTable.findFirst({
        where: and(
          eq(CommunityMembershipsTable.userId, userId),
          eq(CommunityMembershipsTable.communityId, challenge.communityId),
          eq(CommunityMembershipsTable.isAdmin, true)
        ),
      });

    if (isAdmin) {
      throw new ForbiddenException(
        "Only community admins can delete challenges"
      );
    }

    await this.dbService.db
      .delete(ChallengesTable)
      .where(eq(ChallengesTable.id, id));

    return true;
  }

  async leave(userId: number, challengeId: number): Promise<void> {
    await this.dbService.db
      .delete(ChallengeMembershipsTable)
      .where(
        and(
          eq(ChallengeMembershipsTable.userId, userId),
          eq(ChallengeMembershipsTable.challengeId, challengeId)
        )
      );
  }
}
