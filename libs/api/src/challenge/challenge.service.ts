import { Injectable } from "@nestjs/common";
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
import * as schema from "@o/db";
import { and, desc, eq } from "drizzle-orm";

import { DbService } from "../db/db.service";
import { EntityType, EntityUtils } from "../entity";
import { EntityService } from "../entity/entity-service";
import {
  Challenge as GqlChallenge,
  ChallengeCadence,
  ChallengeConnection,
  ChallengeMode,
  ChallengeUpdateInput,
} from "../types/graphql";
import { encodeGlobalId, mapToEnum, validateAndDecodeGlobalId } from "../utils";
import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/errors";
import { ChallengeRepository } from "./challenge.repository";
import { ChallengeActivitiesService } from "./challenge-activity";

@Injectable()
export class ChallengeService
  implements EntityService<typeof ChallengesTable, PgChallenge, GqlChallenge>
{
  constructor(
    private challengeActivitiesService: ChallengeActivitiesService,
    private challengeRepository: ChallengeRepository,
    private dbService: DbService<typeof schema>
  ) {}

  public getTypename(): EntityType {
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
      id: encodeGlobalId(this.getTypename(), challenge.id),
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
      throw new NotFoundError(`Challenge with id ${id} not found`);
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

  async findCommunityChallenges(
    communityId: number,
    first: number,
    after?: string
  ): Promise<ChallengeConnection> {
    const startCursorId = after
      ? validateAndDecodeGlobalId(after, this.getTypename())
      : 0;

    const challenges = await this.dbService.db.query.ChallengesTable.findMany({
      where: eq(ChallengesTable.communityId, communityId),
      limit: first + 1,
      offset: startCursorId,
      orderBy: desc(ChallengesTable.createdAt),
      with: { activities: true },
    });

    const edges = challenges.slice(0, first).map((challenge) => ({
      node: this.pg2GqlMapper({
        ...challenge,
        activities: challenge.activities, // for now one-to-one
      }),
      cursor: encodeGlobalId(this.getTypename(), challenge.id),
    }));

    const hasNextPage = challenges.length > first;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;

    return {
      edges,
      pageInfo: {
        startCursor,
        endCursor,
        hasNextPage,
        hasPreviousPage: startCursorId > 0,
      },
    };
  }

  async create(
    challengeInput: NewChallenge,
    activityInput: Omit<NewChallengeActivity, "challengeId">
    // userId: number
  ): Promise<GqlChallenge> {
    // for now anyone can create a challenge... otherwise communities are just boring
    // const isAdmin =
    //   await this.dbService.db.query.CommunityMembershipsTable.findFirst({
    //     where: and(
    //       eq(CommunityMembershipsTable.userId, userId),
    //       eq(CommunityMembershipsTable.communityId, challengeInput.communityId),
    //       eq(CommunityMembershipsTable.isAdmin, true)
    //     ),
    //   });

    // if (!isAdmin) {
    //   throw new UnauthorizedError(
    //     "Only community admins can create challenges"
    //   );
    // }

    const [challenge] = await this.dbService.db
      .insert(ChallengesTable)
      .values({ ...challengeInput })
      .returning();

    const challengeActivity = await this.challengeActivitiesService.create({
      ...activityInput,
      challengeId: challenge.id,
    });

    if (!challengeActivity) {
      throw new InternalServerError("Failed to create challenge activity");
    }

    return this.pg2GqlMapper({
      ...challenge,
      activities: [challengeActivity],
    });
  }

  async update(challengeInput: ChallengeUpdateInput): Promise<GqlChallenge> {
    const { id: globalId, ...updates } = challengeInput;
    const id = validateAndDecodeGlobalId(globalId, this.getTypename());

    const filteredUpdates = EntityUtils.filterNullValues(updates);
    const updatedChallenge = await this.challengeRepository.update({
      ...filteredUpdates,
      id,
    });

    if (!updatedChallenge) {
      throw new NotFoundError(`Updated challenge with id ${id} not found`);
    }

    return this.pg2GqlMapper(updatedChallenge);
  }

  async remove(id: number, userId: number): Promise<boolean> {
    // Verify that the user is an admin of the community
    const challenge = await this.dbService.db.query.ChallengesTable.findFirst({
      where: eq(ChallengesTable.id, id),
    });

    if (!challenge) {
      throw new NotFoundError(`Challenge with id ${id} not found`);
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
      throw new UnauthorizedError(
        "Only community admins can delete challenges"
      );
    }

    // eslint-disable-next-line drizzle/enforce-delete-with-where
    return this.challengeRepository.delete(id);
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
