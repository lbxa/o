import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {
  ChallengeActivity as PgChallengeActivity,
  ChallengeActivityResult as PgChallengeActivityResult,
  ChallengeActivityResultsTable,
  NewChallengeActivityResult,
  User as PgUser,
} from "@o/db";
import { eq } from "drizzle-orm";

import { DbService } from "../../db/db.service";
import { EntityMapper } from "../../entity";
import { ChallengeActivityResult as GqlChallengeActivityResult } from "../../types/graphql";
import { UsersService } from "../../users/users.service";
import { encodeGlobalId } from "../../utils";
import { ChallengeActivitiesService } from "../challenge-activity";

@Injectable()
export class ChallengeActivityResultsService
  implements
    EntityMapper<
      typeof ChallengeActivityResultsTable,
      PgChallengeActivityResult,
      GqlChallengeActivityResult
    >
{
  constructor(
    private usersService: UsersService,
    private challengeActivitiesService: ChallengeActivitiesService,
    private dbService: DbService
  ) {}

  public pg2GqlMapper(
    challengeActivityResult: PgChallengeActivityResult & {
      user: PgUser;
      activity: PgChallengeActivity;
    }
  ): GqlChallengeActivityResult {
    return {
      ...challengeActivityResult,
      user: this.usersService.pg2GqlMapper(challengeActivityResult.user),
      activity: this.challengeActivitiesService.pg2GqlMapper(
        challengeActivityResult.activity
      ),
      id: encodeGlobalId("ChallengeActivityResult", challengeActivityResult.id),
    };
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
}
