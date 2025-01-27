/* eslint-disable @stylistic/js/max-len */
import { Injectable } from "@nestjs/common";
import type { UserRecord as PgUserRecord } from "@o/db";
import { UserRecordsTable } from "@o/db";

import { ChallengeService } from "@/challenge/challenge.service";
import { ChallengeActivityService } from "@/challenge/challenge-activity";
import { ChallengeActivityResultsRepository } from "@/challenge/challenge-activity-results";
import { RankingService } from "@/challenge/challenge-activity-results/ranking-service";
import {
  EntityService,
  EntityType,
  FindByArgs,
  SearchableNumericFields,
} from "@/entity";
import {
  ChallengeActivityGoal,
  UserRecord as GqlUserRecord,
  UserRecordCreateInput,
} from "@/types/graphql";
import { PgUserRecordComposite } from "@/user/user-records/user-records.types";
import { encodeGlobalId, mapToEnum, validateAndDecodeGlobalId } from "@/utils";
import { InternalServerError, NotFoundError } from "@/utils/errors";

import { UserService } from "../user.service";
import { UserRecordsRepository } from "./user-records.repository";

@Injectable()
export class UserRecordsService
  implements
    EntityService<
      typeof UserRecordsTable,
      PgUserRecord,
      GqlUserRecord,
      PgUserRecordComposite
    >
{
  constructor(
    private userService: UserService,
    private challengeService: ChallengeService,
    private challengeActivityResultsRepository: ChallengeActivityResultsRepository,
    private challengeActivityService: ChallengeActivityService,
    private userRecordsRepository: UserRecordsRepository,
    private rankingService: RankingService
  ) {}

  public getTypename(): EntityType {
    return "UserRecord";
  }

  public pg2GqlMapper(userRecord: PgUserRecordComposite): GqlUserRecord {
    return {
      ...userRecord,
      id: encodeGlobalId(this.getTypename(), userRecord.id),
      user: this.userService.pg2GqlMapper(userRecord.user),
      challenge: this.challengeService.pg2GqlMapper(userRecord.challenge),
      /**
       * Not using the challengeActivityResultsService here to avoid circular
       * dependencies. Need better domain boundaries going forward.
       */
      activityResult: {
        ...userRecord.activityResult,
        id: encodeGlobalId(
          "ChallengeActivityResult",
          userRecord.activityResult.id
        ),
        user: this.userService.pg2GqlMapper(userRecord.activityResult.user),
        activity: this.challengeActivityService.pg2GqlMapper(
          userRecord.activityResult.activity
        ),
      },
    };
  }

  async create(input: UserRecordCreateInput): Promise<GqlUserRecord> {
    const decodedUserId = validateAndDecodeGlobalId(input.userId, "User");
    const decodedChallengeId = validateAndDecodeGlobalId(
      input.challengeId,
      this.challengeService.getTypename()
    );
    const decodedActivityId = validateAndDecodeGlobalId(
      input.activityId,
      "ChallengeActivity"
    );
    const decodedActivityResultId = validateAndDecodeGlobalId(
      input.activityResultId,
      "ChallengeActivityResult"
    );

    const userRecord = await this.userRecordsRepository.create({
      userId: decodedUserId,
      challengeId: decodedChallengeId,
      activityId: decodedActivityId,
      activityResultId: decodedActivityResultId,
    });

    if (!userRecord) {
      throw new InternalServerError("Failed to create user record");
    }

    return this.pg2GqlMapper(userRecord);
  }

  async findById(id: number): Promise<GqlUserRecord> {
    const userRecord = await this.userRecordsRepository.findById(id);

    if (!userRecord) {
      throw new NotFoundError(`UserRecord with id ${id} not found`);
    }

    return this.pg2GqlMapper(userRecord);
  }

  async findBy(
    fields: SearchableNumericFields<
      PgUserRecordComposite,
      "id" | "userId" | "challengeId" | "activityId" | "activityResultId"
    > = {},
    args?: FindByArgs
  ): Promise<GqlUserRecord[]> {
    const userRecords = await this.userRecordsRepository.findBy(fields, args);

    return userRecords.map((userRecord) => this.pg2GqlMapper(userRecord));
  }

  async findByUserId(userId: number): Promise<GqlUserRecord[]> {
    const userRecords = await this.userRecordsRepository.findBy({ userId });

    if (userRecords.length === 0) {
      throw new NotFoundError(`UserRecord with userId ${userId} not found`);
    }

    return userRecords.map((userRecord) => this.pg2GqlMapper(userRecord));
  }

  async isNewRecord({
    userId,
    challengeId,
    challengeActivityId,
    challengeActivityResultId,
  }: {
    userId: number;
    challengeId: number;
    challengeActivityId: number;
    challengeActivityResultId: number;
  }) {
    const existingUserRecords = await this.userRecordsRepository.findBy({
      userId,
      challengeId,
      activityId: challengeActivityId,
    });

    if (existingUserRecords.length === 0) {
      return true;
    }

    // Get the new result
    const newResult = await this.challengeActivityResultsRepository.findById(
      challengeActivityResultId
    );

    if (!newResult) {
      throw new NotFoundError(
        `ActivityResult with id ${challengeActivityResultId} not found`
      );
    }

    const strategy =
      this.rankingService.getRankingStrategy<PgUserRecordComposite>({
        goal: mapToEnum(
          ChallengeActivityGoal,
          existingUserRecords[0].activityResult.activity.goal
        ) as ChallengeActivityGoal,
        _target:
          existingUserRecords[0].activityResult.activity.target ?? undefined,
        accessor: (result) => result.activityResult.result,
      });

    const currentBest = strategy.rank(existingUserRecords)[0];

    // Create a composite record for comparison
    const newRecord: PgUserRecordComposite = {
      ...existingUserRecords[0],
      activityResult: newResult,
    };

    return strategy.compare(newRecord, currentBest) > 0;
  }

  async delete(id: string): Promise<boolean> {
    const decodedId = validateAndDecodeGlobalId(id, this.getTypename());
    // eslint-disable-next-line drizzle/enforce-delete-with-where
    return this.userRecordsRepository.delete(decodedId);
  }
}
