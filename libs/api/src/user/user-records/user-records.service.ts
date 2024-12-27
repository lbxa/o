import { Injectable } from "@nestjs/common";
import type { UserRecord as PgUserRecord } from "@o/db";
import { UserRecordsTable } from "@o/db";

import { ChallengeService } from "@/challenge/challenge.service";
import { ChallengeActivitiesService } from "@/challenge/challenge-activity/challenge-activities.service";
import { ChallengeActivityResultsService } from "@/challenge/challenge-activity-results/challenge-activity-results.service";
import { EntityService, EntityType } from "@/entity";
import {
  UserRecord as GqlUserRecord,
  UserRecordCreateInput,
} from "@/types/graphql";
import { encodeGlobalId, validateAndDecodeGlobalId } from "@/utils";
import { InternalServerError, NotFoundError } from "@/utils/errors";

import { UserService } from "../user.service";
import {
  PgUserRecordComposite,
  UserRecordsRepository,
} from "./user-records.repository";

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
    private challengeActivitiesService: ChallengeActivitiesService,
    private challengeActivityResultsService: ChallengeActivityResultsService,
    private userRecordsRepository: UserRecordsRepository
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
      activityResult: this.challengeActivityResultsService.pg2GqlMapper(
        userRecord.activityResult
      ),
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

  async findByUserId(userId: number): Promise<GqlUserRecord[]> {
    const userRecords = await this.userRecordsRepository.findByUserId(userId);

    if (!userRecords) {
      throw new NotFoundError(`UserRecord with userId ${userId} not found`);
    }

    return userRecords.map((userRecord) => this.pg2GqlMapper(userRecord));
  }

  async delete(id: string): Promise<boolean> {
    const decodedId = validateAndDecodeGlobalId(id, this.getTypename());
    // eslint-disable-next-line drizzle/enforce-delete-with-where
    return this.userRecordsRepository.delete(decodedId);
  }
}
