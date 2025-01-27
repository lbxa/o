import { Injectable } from "@nestjs/common";
import {
  $DrizzleSchema,
  Challenge as PgChallenge,
  ChallengeActivitiesTable,
  ChallengeMembershipsTable,
  ChallengesTable,
  CommunitiesTable,
  CommunityMembershipsTable,
  NewChallenge,
  NewChallengeActivity,
  UsersTable,
} from "@o/db";
import { and, asc, eq, gt, lt } from "drizzle-orm";

import { PgChallengeComposite } from "@/challenge/challenge.types";
import { CommunityRepository } from "@/community/community.repository";
import { CommunityService } from "@/community/community.service";

import { DbService } from "../db/db.service";
import { EntityType, EntityUtils } from "../entity";
import { EntityService } from "../entity/entity-service";
import {
  Challenge as GqlChallenge,
  ChallengeCadence,
  ChallengeConnection,
  ChallengeMode,
  ChallengeUpdateInput,
  EndingSoonChallenge as GqlEndingSoonChallenge,
  StartingSoonChallenge as GqlStartingSoonChallenge,
} from "../types/graphql";
import { encodeGlobalId, mapToEnum, validateAndDecodeGlobalId } from "../utils";
import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/errors";
import { ChallengeRepository } from "./challenge.repository";
import { ChallengeActivityService } from "./challenge-activity";

@Injectable()
export class ChallengeService
  implements
    EntityService<
      typeof ChallengesTable,
      PgChallenge,
      GqlChallenge,
      PgChallengeComposite
    >
{
  constructor(
    private challengeActivityService: ChallengeActivityService,
    private challengeRepository: ChallengeRepository,
    private communityService: CommunityService,
    private communityRepository: CommunityRepository,
    private dbService: DbService<typeof $DrizzleSchema>
  ) {}

  public getTypename(): EntityType {
    return "Challenge";
  }

  public pg2GqlMapper(challenge: PgChallengeComposite): GqlChallenge {
    return {
      ...challenge,
      mode: mapToEnum(ChallengeMode, challenge.mode),
      cadence: mapToEnum(ChallengeCadence, challenge.cadence),
      activity: this.challengeActivityService.pg2GqlMapper(
        challenge.activities[0]
      ),
      community: this.communityService.pg2GqlMapper(challenge.community),
      id: encodeGlobalId(this.getTypename(), challenge.id),
    };
  }

  async findById(id: number): Promise<GqlChallenge> {
    const challenge = await this.challengeRepository.findById(id);

    if (!challenge) {
      throw new NotFoundError(`Challenge with id ${id} not found`);
    }

    return this.pg2GqlMapper(challenge);
  }

  async findAll(): Promise<GqlChallenge[]> {
    const allChallenges =
      await this.dbService.db.query.ChallengesTable.findMany({
        with: {
          activities: {
            with: {
              challenge: true,
            },
          },
          community: { with: { owner: true } },
        },
      });

    return allChallenges.map((challenge) => this.pg2GqlMapper(challenge));
  }

  async findUserChallenges(userId: number): Promise<GqlChallenge[]> {
    const challenges = await this.dbService.db
      .select({
        challenge: ChallengesTable,
        activities: ChallengeActivitiesTable,
        community: CommunitiesTable,
        owner: UsersTable,
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
      .innerJoin(
        CommunitiesTable,
        eq(ChallengesTable.communityId, CommunitiesTable.id)
      )
      .innerJoin(UsersTable, eq(CommunitiesTable.ownerId, UsersTable.id))
      .where(eq(ChallengeMembershipsTable.userId, userId));

    return challenges.map((challenge) =>
      this.pg2GqlMapper({
        ...challenge.challenge,
        activities: [
          {
            ...challenge.activities, // For now there will only be one activity per challenge
            challenge: challenge.challenge,
          },
        ],
        community: {
          ...challenge.community,
          owner: challenge.owner,
        },
      })
    );
  }

  async findChallengesStartingSoon(
    userId: number
  ): Promise<GqlStartingSoonChallenge[]> {
    const now = new Date();

    const challenges = await this.dbService.db
      .select({
        challenge: ChallengesTable,
        activity: ChallengeActivitiesTable,
        community: CommunitiesTable,
        owner: UsersTable,
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
      .innerJoin(
        CommunitiesTable,
        eq(ChallengesTable.communityId, CommunitiesTable.id)
      )
      .innerJoin(UsersTable, eq(CommunitiesTable.ownerId, UsersTable.id))
      .where(
        and(
          eq(ChallengeMembershipsTable.userId, userId),
          gt(ChallengesTable.startDate, now)
        )
      )
      .orderBy(asc(ChallengesTable.startDate));

    return challenges.map((challenge) => ({
      __typename: "StartingSoonChallenge" as const,
      id: encodeGlobalId("StartingSoonChallenge", challenge.challenge.id),
      challenge: this.pg2GqlMapper({
        ...challenge.challenge,
        activities: [
          {
            ...challenge.activity,
            challenge: challenge.challenge,
          },
        ],
        community: {
          ...challenge.community,
          owner: challenge.owner,
        },
      }),
      createdAt: challenge.challenge.startDate,
      daysUntilStart: Math.ceil(
        (challenge.challenge.startDate.getTime() - now.getTime()) /
          (1000 * 60 * 60 * 24)
      ),
    }));
  }

  async findChallengesEndingSoon(
    userId: number
  ): Promise<GqlEndingSoonChallenge[]> {
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const challenges = await this.dbService.db
      .select({
        challenge: ChallengesTable,
        activity: ChallengeActivitiesTable,
        community: CommunitiesTable,
        owner: UsersTable,
      })
      // TODO
      // the home feed should also act as discovery for the user,
      // it should also recommend challenges they are not a member of
      .from(ChallengeMembershipsTable)
      .innerJoin(
        ChallengesTable,
        eq(ChallengesTable.id, ChallengeMembershipsTable.challengeId)
      )
      .innerJoin(
        ChallengeActivitiesTable,
        eq(ChallengesTable.id, ChallengeActivitiesTable.challengeId)
      )
      .innerJoin(
        CommunitiesTable,
        eq(ChallengesTable.communityId, CommunitiesTable.id)
      )
      .innerJoin(UsersTable, eq(CommunitiesTable.ownerId, UsersTable.id))
      .where(
        and(
          eq(ChallengeMembershipsTable.userId, userId),
          gt(ChallengesTable.endDate, now),
          lt(ChallengesTable.endDate, sevenDaysFromNow)
        )
      )
      .orderBy(asc(ChallengesTable.endDate));

    return challenges.map((challenge) => ({
      __typename: "EndingSoonChallenge" as const,
      id: encodeGlobalId("EndingSoonChallenge", challenge.challenge.id),
      challenge: this.pg2GqlMapper({
        ...challenge.challenge,
        activities: [
          {
            ...challenge.activity,
            challenge: challenge.challenge,
          },
        ],
        community: {
          ...challenge.community,
          owner: challenge.owner,
        },
      }),
      createdAt: challenge.challenge.endDate,
      daysUntilEnd: Math.ceil(
        (challenge.challenge.endDate.getTime() - now.getTime()) /
          (1000 * 60 * 60 * 24)
      ),
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

    const challenges = await this.challengeRepository.findBy(
      {
        communityId,
      },
      {
        first,
        after: startCursorId,
      }
    );

    const edges = challenges.slice(0, first).map((challenge) => ({
      node: this.pg2GqlMapper(challenge),
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

    const challengeActivity = await this.challengeActivityService.create({
      ...activityInput,
      challengeId: challenge.id,
    });

    if (!challengeActivity) {
      throw new InternalServerError("Failed to create challenge activity");
    }

    const community = await this.communityRepository.findById(
      challenge.communityId
    );

    if (!community) {
      throw new NotFoundError(
        `Community with id ${challenge.communityId} not found`
      );
    }

    return this.pg2GqlMapper({
      ...challenge,
      activities: [
        {
          ...challengeActivity,
          challenge,
        },
      ],
      community,
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
