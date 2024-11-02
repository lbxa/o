import { Injectable } from "@nestjs/common";
import {
  ChallengeActivityResult as PgChallengeActivityResult,
  ChallengeActivityResultsTable,
  NewChallengeActivityResult,
} from "@o/db";

import { DbService } from "../../db/db.service";
import { AsyncEntityMapper } from "../../entity";
import { ChallengeActivityResult as GqlChallengeActivityResult } from "../../types/graphql";
import { UsersService } from "../../users/users.service";
import { encodeGlobalId } from "../../utils";
import { ChallengeActivitiesService } from "../challenge-activity";

@Injectable()
export class ChallengeActivityResultsService
  implements
    AsyncEntityMapper<
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

  public async pg2GqlMapperAsync(
    challengeActivityResult: PgChallengeActivityResult
  ): Promise<GqlChallengeActivityResult> {
    const user = await this.usersService.findOne(
      challengeActivityResult.userId
    );

    const activity = await this.challengeActivitiesService.findOne({
      activityId: challengeActivityResult.activityId,
    });

    return {
      ...challengeActivityResult,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      user: user!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      activity: activity!,
      id: encodeGlobalId("ChallengeActivityResult", challengeActivityResult.id),
    };
  }

  public async create(
    challengeActivityResultInput: NewChallengeActivityResult
  ): Promise<GqlChallengeActivityResult> {
    const [challengeActivityResult] = await this.dbService.db
      .insert(ChallengeActivityResultsTable)
      .values(challengeActivityResultInput)
      .returning();

    return this.pg2GqlMapperAsync(challengeActivityResult);
  }
}
