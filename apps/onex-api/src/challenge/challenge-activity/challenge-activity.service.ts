import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {
  $DrizzleSchema,
  ChallengeActivitiesTable,
  ChallengeActivity as PgChallengeActivity,
  NewChallengeActivity,
} from "@o/db";
import { eq } from "drizzle-orm";

import { DbService } from "../../db/db.service";
import {
  EntityService,
  EntityType,
  SearchableNumericFields,
} from "../../entity";
import {
  ChallengeActivity as GqlChallengeActivity,
  ChallengeActivityGoal,
  ChallengeActivityType,
  ChallengeActivityUnits,
} from "../../types/graphql";
import { encodeGlobalId, mapToEnum } from "../../utils";

@Injectable()
export class ChallengeActivityService
  implements
    EntityService<
      typeof ChallengeActivitiesTable,
      PgChallengeActivity,
      GqlChallengeActivity
    >
{
  constructor(private dbService: DbService<typeof $DrizzleSchema>) {}

  public getTypename(): EntityType {
    return "ChallengeActivity";
  }

  public pg2GqlMapper(
    challengeActivity: PgChallengeActivity
  ): GqlChallengeActivity {
    return {
      ...challengeActivity,
      type: mapToEnum(ChallengeActivityType, challengeActivity.type),
      goal: mapToEnum(ChallengeActivityGoal, challengeActivity.goal),
      unit: mapToEnum(ChallengeActivityUnits, challengeActivity.unit),
      challengeId: encodeGlobalId("Challenge", challengeActivity.challengeId),
      id: encodeGlobalId("ChallengeActivity", challengeActivity.id),
    };
  }

  findBy(
    _fields: SearchableNumericFields<PgChallengeActivity, "id" | "challengeId">
  ): Promise<GqlChallengeActivity[]> {
    throw new Error("Method not implemented.");
  }

  public async findById(id: number): Promise<GqlChallengeActivity | undefined> {
    const challengeActivity =
      await this.dbService.db.query.ChallengeActivitiesTable.findFirst({
        where: eq(ChallengeActivitiesTable.id, id),
      });

    return challengeActivity ? this.pg2GqlMapper(challengeActivity) : undefined;
  }

  public async findOne(params: {
    challengeId?: number;
    activityId?: number;
  }): Promise<GqlChallengeActivity | undefined> {
    const { challengeId = undefined, activityId = undefined } = params;

    const whereClause = challengeId
      ? eq(ChallengeActivitiesTable.challengeId, challengeId)
      : activityId
        ? eq(ChallengeActivitiesTable.id, activityId)
        : undefined;

    if (!whereClause) {
      throw new InternalServerErrorException(
        "At least one search criterion must be provided."
      );
    }

    const challengeActivity =
      await this.dbService.db.query.ChallengeActivitiesTable.findFirst({
        where: whereClause,
      });

    return challengeActivity ? this.pg2GqlMapper(challengeActivity) : undefined;
  }

  public async create(
    challengeActivityInput: NewChallengeActivity
  ): Promise<PgChallengeActivity | undefined> {
    const [challengeActivity] = await this.dbService.db
      .insert(ChallengeActivitiesTable)
      .values(challengeActivityInput)
      .returning();

    return challengeActivity;
  }
}
