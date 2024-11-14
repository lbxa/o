import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {
  ChallengeActivity as PgChallengeActivity,
  ChallengeActivityResult as PgChallengeActivityResult,
  ChallengeActivityResultsTable,
  NewChallengeActivityResult,
  User as PgUser,
} from "@o/db";
import * as schema from "@o/db";
import { eq } from "drizzle-orm";

import { DbService } from "../../db/db.service";
import { EntityService } from "../../entity";
import { ChallengeActivityResult as GqlChallengeActivityResult } from "../../types/graphql";
import { UserService } from "../../user/user.service";
import { encodeGlobalId } from "../../utils";
import { ChallengeActivitiesService } from "../challenge-activity";
import { getRankingStrategy } from "./ranking-strategies";

@Injectable()
export class ChallengeActivityResultsService
  implements
    EntityService<
      typeof ChallengeActivityResultsTable,
      PgChallengeActivityResult,
      GqlChallengeActivityResult
    >
{
  constructor(
    private userService: UserService,
    private challengeActivitiesService: ChallengeActivitiesService,
    private dbService: DbService<typeof schema>
  ) {}

  public getTypename(): string {
    return "ChallengeActivityResult";
  }

  public pg2GqlMapper(
    challengeActivityResult: PgChallengeActivityResult & {
      user: PgUser;
      activity: PgChallengeActivity;
    }
  ): GqlChallengeActivityResult {
    return {
      ...challengeActivityResult,
      user: this.userService.pg2GqlMapper(challengeActivityResult.user),
      activity: this.challengeActivitiesService.pg2GqlMapper(
        challengeActivityResult.activity
      ),
      id: encodeGlobalId("ChallengeActivityResult", challengeActivityResult.id),
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
      throw new Error("Challenge activity result not found");
    }

    return this.pg2GqlMapper(challengeActivityResultWithRelations);
  }

  public async fetchTopResults(params: {
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

    if (challengeActivityResults.length === 0) {
      // no activity results for this challenge
      return [];
    }

    const gqlFormattedResults = challengeActivityResults.map((result) =>
      this.pg2GqlMapper(result)
    );

    // assuming all activities in a challenge are of the same type
    const strategy = getRankingStrategy(
      challengeActivityResults[0].activity.goal,
      challengeActivityResults[0].activity.target ?? undefined
    );
    const rankedResults = strategy.rank(gqlFormattedResults);

    // remove duplicate user entries, keeping only the first occurrence
    const uniqueResults = Array.from(
      new Map(rankedResults.map((result) => [result.user.id, result])).values()
    );

    return uniqueResults;
  }
}
