import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {
  $DrizzleSchema,
  ChallengeActivitiesTable,
  ChallengeActivity as PgChallengeActivity,
  ChallengeActivityResult as PgChallengeActivityResult,
  ChallengeActivityResultsTable,
  ChallengeMembershipsTable,
  NewChallengeActivityResult,
  User as PgUser,
  UsersTable,
} from "@o/db";
import { and, count, desc, eq, inArray, max, min, SQL, sql } from "drizzle-orm";

import { ChallengeMembershipsService } from "@/challenge/challenge-memberships";

import { DbService } from "../../db/db.service";
import { EntityService, EntityType } from "../../entity";
import {
  ChallengeActivityResult as GqlChallengeActivityResult,
  ChallengeActivityResultConnection,
  ChallengeActivityTopMover as GqlChallengeActivityTopMover,
  ChallengeActivityTopMoverConnection,
} from "../../types/graphql";
import { UserService } from "../../user/user.service";
import { UserStreaksService } from "../../user/user-streaks";
import {
  buildConnection,
  ConnectionArgs,
  encodeGlobalId,
  validateAndDecodeGlobalId,
} from "../../utils";
import { NotFoundError } from "../../utils/errors";
import { ChallengeActivitiesService } from "../challenge-activity";
import { getRankingStrategy } from "./ranking-strategies";

type ChallengeActivityResultComposite = PgChallengeActivityResult & {
  user: PgUser;
  activity: PgChallengeActivity;
};

@Injectable()
export class ChallengeActivityResultsService
  implements
    EntityService<
      typeof ChallengeActivityResultsTable,
      PgChallengeActivityResult,
      GqlChallengeActivityResult,
      ChallengeActivityResultComposite
    >
{
  constructor(
    private userService: UserService,
    private challengeMembershipsService: ChallengeMembershipsService,
    private challengeActivitiesService: ChallengeActivitiesService,
    private userStreaksService: UserStreaksService,
    private dbService: DbService<typeof $DrizzleSchema>
  ) {}

  public getTypename(): EntityType {
    return "ChallengeActivityResult";
  }

  public pg2GqlMapper(
    challengeActivityResult: ChallengeActivityResultComposite
  ): GqlChallengeActivityResult {
    return {
      ...challengeActivityResult,
      user: this.userService.pg2GqlMapper(challengeActivityResult.user),
      activity: this.challengeActivitiesService.pg2GqlMapper(
        challengeActivityResult.activity
      ),
      id: encodeGlobalId(this.getTypename(), challengeActivityResult.id),
    };
  }

  public async findById(
    id: number
  ): Promise<GqlChallengeActivityResult | undefined> {
    const challengeActivityResult =
      await this.dbService.db.query.ChallengeActivityResultsTable.findFirst({
        where: eq(ChallengeActivityResultsTable.id, id),
        with: {
          user: true,
          activity: true,
        },
      });

    return challengeActivityResult
      ? this.pg2GqlMapper(challengeActivityResult)
      : undefined;
  }

  public async findOne(params: {
    activityId?: number;
    challengeId?: number;
  }): Promise<GqlChallengeActivityResult | undefined> {
    const { activityId = undefined, challengeId = undefined } = params;

    const whereClause = challengeId
      ? eq(ChallengeActivityResultsTable.challengeId, challengeId)
      : activityId
        ? eq(ChallengeActivityResultsTable.activityId, activityId)
        : undefined;

    if (!whereClause) {
      throw new InternalServerErrorException(
        "At least one search criterion must be provided."
      );
    }

    const challengeActivityResult =
      await this.dbService.db.query.ChallengeActivityResultsTable.findFirst({
        where: whereClause,
        with: {
          user: true,
          activity: true,
        },
      });

    return challengeActivityResult
      ? this.pg2GqlMapper(challengeActivityResult)
      : undefined;
  }

  public async findAll(params: {
    activityId?: number;
    challengeId?: number;
  }): Promise<GqlChallengeActivityResult[]> {
    const { activityId = undefined, challengeId = undefined } = params;

    const whereClause = challengeId
      ? eq(ChallengeActivityResultsTable.challengeId, challengeId)
      : activityId
        ? eq(ChallengeActivityResultsTable.activityId, activityId)
        : undefined;

    if (!whereClause) {
      throw new InternalServerErrorException(
        "At least one search criterion must be provided."
      );
    }

    const challengeActivityResults =
      await this.dbService.db.query.ChallengeActivityResultsTable.findMany({
        where: whereClause,
        with: {
          user: true,
          activity: true,
        },
      });

    return challengeActivityResults.map((result) => this.pg2GqlMapper(result));
  }

  public async create(
    challengeActivityResultInput: NewChallengeActivityResult
  ): Promise<GqlChallengeActivityResult> {
    const [challengeActivityResult] = await this.dbService.db
      .insert(ChallengeActivityResultsTable)
      .values(challengeActivityResultInput)
      .returning();

    const challengeActivityResultWithRelations =
      await this.dbService.db.query.ChallengeActivityResultsTable.findFirst({
        where: eq(ChallengeActivityResultsTable.id, challengeActivityResult.id),
        with: {
          user: true,
          activity: true,
        },
      });

    if (!challengeActivityResultWithRelations) {
      throw new NotFoundError("Challenge activity result not found");
    }

    /**
     * Each challenge activity result creates or updates a streak for the user,
     * but only if it was completed on the next consecutive day.
     */
    await this.userStreaksService.incrementStreak(
      challengeActivityResultWithRelations.userId
    );

    /**
     * Users are automatically added to the challenge when they complete an
     * activity.
     */
    const isMember = await this.challengeMembershipsService.isMember(
      challengeActivityResultWithRelations.userId,
      challengeActivityResultWithRelations.challengeId
    );

    if (!isMember) {
      await this.challengeMembershipsService.join(
        challengeActivityResultWithRelations.userId,
        {
          challengeId: challengeActivityResultWithRelations.challengeId,
        }
      );
    }

    return this.pg2GqlMapper(challengeActivityResultWithRelations);
  }

  public async fetchTopMovers(
    params: {
      challengeId?: number;
      activityId?: number;
    },
    { first = 10, after }: ConnectionArgs
  ): Promise<ChallengeActivityTopMoverConnection> {
    const { challengeId = undefined, activityId = undefined } = params;

    const startCursorId = after
      ? validateAndDecodeGlobalId(
          after,
          challengeId ? "Challenge" : "ChallengeActivity"
        )
      : 0;

    const whereConditions: SQL[] = [];

    if (challengeId) {
      whereConditions.push(
        eq(ChallengeActivityResultsTable.challengeId, challengeId)
      );
    }

    if (activityId) {
      whereConditions.push(
        eq(ChallengeActivityResultsTable.activityId, activityId)
      );
    }

    if (whereConditions.length === 0) {
      throw new InternalServerErrorException(
        "At least one search criterion must be provided."
      );
    }

    const aggregatedResults = await this.dbService.db
      .select({
        user: UsersTable,
        activity: ChallengeActivitiesTable,
        minResult: min(ChallengeActivityResultsTable.result),
        maxResult: max(ChallengeActivityResultsTable.result),
        totalResults: count(ChallengeActivityResultsTable.id),
      })
      .from(ChallengeMembershipsTable)
      .innerJoin(
        UsersTable,
        eq(ChallengeMembershipsTable.userId, UsersTable.id)
      )
      .innerJoin(
        ChallengeActivityResultsTable,
        and(
          eq(ChallengeActivityResultsTable.userId, UsersTable.id),
          ...whereConditions
        )
      )
      .innerJoin(
        ChallengeActivitiesTable,
        eq(
          ChallengeActivitiesTable.id,
          ChallengeActivityResultsTable.activityId
        )
      )
      .groupBy(UsersTable.id, ChallengeActivitiesTable.id)
      .having(sql<boolean>`count(${ChallengeActivityResultsTable.id}) > 1`)
      .orderBy(desc(max(ChallengeActivityResultsTable.result)))
      .offset(startCursorId);

    if (aggregatedResults.length === 0) {
      return buildConnection({
        nodes: [],
        hasNextPage: false,
        hasPreviousPage: false,
      });
    }

    const validActivityIds = aggregatedResults.map(
      (result) => result.activity.id
    );

    const challengeActivityResults =
      await this.dbService.db.query.ChallengeActivityResultsTable.findMany({
        where: and(
          ...whereConditions,
          inArray(ChallengeActivityResultsTable.activityId, validActivityIds)
        ),
      });

    const challengeActivityResultLookup = new Map<
      string, // composite key of userId_activityId
      PgChallengeActivityResult
    >(
      challengeActivityResults.map((result) => [
        [result.userId, result.activityId].join("-"),
        result,
      ])
    );

    const formattedResults: GqlChallengeActivityTopMover[] = aggregatedResults
      .filter(
        (
          result
        ): result is typeof result & {
          minResult: number;
          maxResult: number;
        } => result.minResult !== null && result.maxResult !== null
      )
      // We're not overriding the existing ChallengeActivityResult
      // type just piggybacking some of the existing logic this
      // avoids global id collisions...
      .map(({ activity, user, maxResult, minResult }) => ({
        ...this.pg2GqlMapper({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ...challengeActivityResultLookup.get(`${user.id}-${activity.id}`)!,
          activity,
          user,
        }),
        __typename: "ChallengeActivityTopMover" as const,
        id: encodeGlobalId(
          "ChallengeActivityTopMover",
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          challengeActivityResultLookup.get(`${user.id}-${activity.id}`)!.id
        ),
        result: Math.round(((maxResult - minResult) / minResult) * 100),
      }))
      .sort((a, b) => b.result - a.result)
      .slice(0, first);

    return buildConnection({
      nodes: formattedResults,
      hasNextPage: formattedResults.length > first,
      hasPreviousPage: startCursorId > 0,
      createCursor: (node) => node.id,
    });
  }

  public async fetchTopResults(
    params: {
      activityId?: number;
      challengeId?: number;
    },
    { first = 10, after }: ConnectionArgs
  ): Promise<ChallengeActivityResultConnection> {
    const { activityId = undefined, challengeId = undefined } = params;

    const startCursorId = after
      ? validateAndDecodeGlobalId(
          after,
          challengeId ? "Challenge" : "ChallengeActivity"
        )
      : 0;

    const whereConditions: SQL[] = [];

    if (challengeId) {
      whereConditions.push(
        eq(ChallengeActivityResultsTable.challengeId, challengeId)
      );
    }

    if (activityId) {
      whereConditions.push(
        eq(ChallengeActivityResultsTable.activityId, activityId)
      );
    }

    if (whereConditions.length === 0) {
      throw new InternalServerErrorException(
        "At least one search criterion must be provided."
      );
    }

    const challengeActivityResults =
      await this.dbService.db.query.ChallengeActivityResultsTable.findMany({
        where: and(...whereConditions),
        with: {
          user: true,
          activity: true,
        },
      });

    if (challengeActivityResults.length === 0) {
      // no activity results for this challenge
      return buildConnection({
        nodes: [],
        hasNextPage: false,
        hasPreviousPage: false,
      });
    }

    const gqlFormattedResults = challengeActivityResults.map((result) =>
      this.pg2GqlMapper(result)
    );

    // assuming all activities in a challenge are homogeneous
    const strategy = getRankingStrategy(
      challengeActivityResults[0].activity.goal,
      challengeActivityResults[0].activity.target ?? undefined
    );
    const rankedResults = strategy.rank(gqlFormattedResults);

    // remove duplicate user entries after first occurrence
    const seenUsers = new Set<string>();
    const uniqueResults = rankedResults.filter((result) => {
      if (seenUsers.has(result.user.id)) {
        return false;
      }
      seenUsers.add(result.user.id);
      return true;
    });

    return buildConnection({
      nodes: uniqueResults.slice(0, first),
      hasNextPage: uniqueResults.length > first,
      hasPreviousPage: startCursorId > 0,
      createCursor: (node) => node.id,
    });

    // return {
    //   edges: uniqueResults.slice(0, first).map((result) => ({
    //     node: result,
    //     cursor: result.id,
    //   })),
    //   pageInfo: {
    //     startCursor: uniqueResults[0].id,
    //     endCursor: uniqueResults[uniqueResults.length - 1].id,
    //     hasNextPage: uniqueResults.length > first,
    //     hasPreviousPage: startCursorId > 0,
    //   },
    // };
  }

  public async getCount(userId: number): Promise<number> {
    const results =
      await this.dbService.db.query.ChallengeActivityResultsTable.findMany({
        where: eq(ChallengeActivityResultsTable.userId, userId),
      });
    return results.length;
  }
}
