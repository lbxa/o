/* eslint-disable @stylistic/js/max-len */
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {
  $DrizzleSchema,
  ChallengeActivitiesTable,
  ChallengeActivityResult as PgChallengeActivityResult,
  ChallengeActivityResultsTable,
  ChallengeMembershipsTable,
  ChallengesTable,
  NewChallengeActivityResult,
  UsersTable,
} from "@o/db";
import { and, count, desc, eq, inArray, max, min, SQL, sql } from "drizzle-orm";

import {
  ChallengeActivityResultsRepository,
  PgChallengeActivityResultComposite,
} from "@/challenge/challenge-activity-results";
import { ChallengeMembershipsService } from "@/challenge/challenge-memberships";
import { DbService } from "@/db/db.service";
import { EntityService, EntityType, SearchableNumericFields } from "@/entity";
import {
  ChallengeActivityGoal,
  ChallengeActivityResult as GqlChallengeActivityResult,
  ChallengeActivityResultConnection,
  ChallengeActivityTopMover as GqlChallengeActivityTopMover,
  ChallengeActivityTopMoverConnection,
} from "@/types/graphql";
import { UserService } from "@/user/user.service";
import { UserRecordsRepository, UserRecordsService } from "@/user/user-records";
import { UserStreaksService } from "@/user/user-streaks";
import {
  buildConnection,
  ConnectionArgs,
  encodeGlobalId,
  validateAndDecodeGlobalId,
} from "@/utils";
import { mapToEnum, NotFoundError } from "@/utils";

import {
  ChallengeActivityFormatterService,
  ChallengeActivityService,
} from "../challenge-activity";
import { RankingService } from "./ranking-service";

@Injectable()
export class ChallengeActivityResultsService
  implements
    EntityService<
      typeof ChallengeActivityResultsTable,
      PgChallengeActivityResult,
      GqlChallengeActivityResult,
      PgChallengeActivityResultComposite
    >
{
  constructor(
    private userService: UserService,
    private challengeMembershipsService: ChallengeMembershipsService,
    private challengeActivityService: ChallengeActivityService,
    private challengeActivityResultsRepository: ChallengeActivityResultsRepository,
    private challengeActivityFormatterService: ChallengeActivityFormatterService,
    private userStreaksService: UserStreaksService,
    private userRecordsService: UserRecordsService,
    private userRecordsRepository: UserRecordsRepository,
    private dbService: DbService<typeof $DrizzleSchema>,
    private rankingService: RankingService
  ) {}

  public getTypename(): EntityType {
    return "ChallengeActivityResult";
  }

  public pg2GqlMapper(
    challengeActivityResult: PgChallengeActivityResultComposite
  ): GqlChallengeActivityResult {
    return {
      ...challengeActivityResult,
      user: this.userService.pg2GqlMapper(challengeActivityResult.user),
      activity: this.challengeActivityService.pg2GqlMapper(
        challengeActivityResult.activity
      ),
      id: encodeGlobalId(this.getTypename(), challengeActivityResult.id),
    };
  }

  public async findBy(
    fields: Partial<Record<keyof PgChallengeActivityResult, number | number[]>>
  ): Promise<GqlChallengeActivityResult[]> {
    const challengeActivityResults =
      await this.challengeActivityResultsRepository.findBy(fields);

    return challengeActivityResults.map((result) => this.pg2GqlMapper(result));
  }

  public async findById(
    id: number
  ): Promise<GqlChallengeActivityResult | undefined> {
    const challengeActivityResult =
      await this.challengeActivityResultsRepository.findById(id);

    return challengeActivityResult
      ? this.pg2GqlMapper(challengeActivityResult)
      : undefined;
  }

  public async findOne(
    params: Partial<{
      activityId: number;
      challengeId: number;
    }>
  ): Promise<GqlChallengeActivityResult | undefined> {
    const challengeActivityResults =
      await this.challengeActivityResultsRepository.findBy(params);

    return challengeActivityResults.length > 0
      ? this.pg2GqlMapper(challengeActivityResults[0])
      : undefined;
  }

  public async findAll(
    params: Partial<{
      activityId: number;
      challengeId: number;
    }>
  ): Promise<GqlChallengeActivityResult[]> {
    const challengeActivityResults =
      await this.challengeActivityResultsRepository.findBy(params);

    return challengeActivityResults.length > 0
      ? challengeActivityResults.map((result) => this.pg2GqlMapper(result))
      : [];
  }

  public async fetchUserChallengeActivityResultHistory(
    params: Pick<
      PgChallengeActivityResult,
      "userId" | "challengeId" | "activityId"
    >,
    args: ConnectionArgs
  ): Promise<ChallengeActivityResultConnection> {
    const { first = 10, after } = args;

    const startCursorId = after
      ? validateAndDecodeGlobalId(after, "ChallengeActivityResult")
      : 0;

    const challengeActivityResults =
      await this.challengeActivityResultsRepository.findBy(params, {
        limit: first + 1,
        offset: startCursorId,
      });

    return buildConnection({
      nodes: challengeActivityResults
        .slice(0, first)
        .map((result) => this.pg2GqlMapper(result)),
      hasNextPage: challengeActivityResults.length > first,
      hasPreviousPage: !!after,
      createCursor: (node) => node.id,
    });
  }

  public async create(
    challengeActivityResultInput: Omit<
      NewChallengeActivityResult,
      "formattedResult" // we handle that here :D
    >
  ): Promise<GqlChallengeActivityResult> {
    const activity = await this.challengeActivityService.findById(
      challengeActivityResultInput.activityId
    );

    if (!activity) {
      throw new NotFoundError("Challenge activity could not be found");
    }

    const newResult = await this.challengeActivityResultsRepository.create({
      ...challengeActivityResultInput,
      targetReached: activity.target
        ? challengeActivityResultInput.result >= activity.target
        : null,
      formattedResult:
        this.challengeActivityFormatterService.formatActivityResult({
          result: challengeActivityResultInput.result,
          goal: activity.goal,
          unit: activity.unit,
        }),
    });

    if (!newResult) {
      throw new NotFoundError("Challenge activity could not be created");
    }

    /**
     * Each challenge activity result creates or updates a streak for the user,
     * but only if it was completed on the next consecutive day.
     */
    await this.userStreaksService.incrementStreak(newResult.userId);

    /**
     * Check if the user broke a new record for that challenge activity.
     */
    const isNewRecord = await this.userRecordsService.isNewRecord({
      userId: newResult.userId,
      challengeId: newResult.challengeId,
      challengeActivityId: newResult.activityId,
      challengeActivityResultId: newResult.id,
    });

    if (isNewRecord) {
      await this.userRecordsRepository.create({
        userId: newResult.userId,
        challengeId: newResult.challengeId,
        activityId: newResult.activityId,
        activityResultId: newResult.id,
      });
    }

    /**
     * Users are automatically added to the challenge when they complete an
     * activity.
     */
    const isMember = await this.challengeMembershipsService.isMember(
      newResult.userId,
      newResult.challengeId
    );

    if (!isMember) {
      await this.challengeMembershipsService.join(newResult.userId, {
        challengeId: newResult.challengeId,
      });
    }

    return this.pg2GqlMapper(newResult);
  }

  public async fetchTopMovers(
    params: Partial<
      Pick<PgChallengeActivityResult, "challengeId" | "activityId">
    >,
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

    const usersWithMultipleResults = this.dbService.db
      .select({
        userId: ChallengeActivityResultsTable.userId,
        activityId: ChallengeActivityResultsTable.activityId,
      })
      .from(ChallengeActivityResultsTable)
      .where(and(...whereConditions))
      .groupBy(
        ChallengeActivityResultsTable.userId,
        ChallengeActivityResultsTable.activityId
      )
      .having(sql<boolean>`count(${ChallengeActivityResultsTable.id}) > 1`)
      .as("subquery");

    const aggregatedResults = await this.dbService.db
      .select({
        user: UsersTable,
        activity: ChallengeActivitiesTable,
        challenge: ChallengesTable,
        minResult: min(ChallengeActivityResultsTable.result),
        maxResult: max(ChallengeActivityResultsTable.result),
        totalResults: count(ChallengeActivityResultsTable.id),
      })
      .from(ChallengeMembershipsTable)
      .innerJoin(
        usersWithMultipleResults,
        eq(usersWithMultipleResults.userId, ChallengeMembershipsTable.userId)
      )
      .innerJoin(UsersTable, eq(UsersTable.id, usersWithMultipleResults.userId))
      .innerJoin(
        ChallengeActivityResultsTable,
        eq(
          ChallengeActivityResultsTable.userId,
          usersWithMultipleResults.userId
        )
      )
      .innerJoin(
        ChallengeActivitiesTable,
        eq(
          ChallengeActivitiesTable.id,
          ChallengeActivityResultsTable.activityId
        )
      )
      .innerJoin(
        ChallengesTable,
        eq(ChallengesTable.id, ChallengeActivityResultsTable.challengeId)
      )
      .where(and(...whereConditions))
      .groupBy(UsersTable.id, ChallengeActivitiesTable.id, ChallengesTable.id)
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
      .map(({ activity, user, maxResult, minResult, challenge }) => ({
        ...this.pg2GqlMapper({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ...challengeActivityResultLookup.get(`${user.id}-${activity.id}`)!,
          activity: {
            ...activity,
            challenge,
          },
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
    fields: SearchableNumericFields<
      PgChallengeActivityResult,
      "challengeId" | "activityId"
    >,
    { first = 10, after }: ConnectionArgs
  ): Promise<ChallengeActivityResultConnection> {
    const { challengeId = undefined } = fields;

    const startCursorId = after
      ? validateAndDecodeGlobalId(
          after,
          challengeId ? "Challenge" : "ChallengeActivity"
        )
      : 0;

    const challengeActivityResults =
      await this.challengeActivityResultsRepository.findBy(fields);

    if (challengeActivityResults.length === 0) {
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
    const strategy =
      this.rankingService.getRankingStrategy<GqlChallengeActivityResult>({
        goal: mapToEnum(
          ChallengeActivityGoal,
          challengeActivityResults[0].activity.goal
        ),
        _target: challengeActivityResults[0].activity.target ?? undefined,
        accessor: (result) => result.result,
      });
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
  }

  public async getCount(userId: number): Promise<number> {
    const [row] = await this.dbService.db
      .select({ count: count(ChallengeActivityResultsTable.id) })
      .from(ChallengeActivityResultsTable)
      .where(eq(ChallengeActivityResultsTable.userId, userId));
    return row.count;
  }
}
