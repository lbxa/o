import { Injectable } from "@nestjs/common";
import type { User as PgUser, UserRecord as PgUserRecord } from "@o/db";
import { UserRecordsTable } from "@o/db";

import { EntityService, EntityType } from "@/entity";

import { ChallengeService } from "../../challenge/challenge.service";
import {
  Challenge,
  ChallengeActivity,
  ChallengeActivityResult,
  UserRecord as GqlUserRecord,
  UserRecordCreateInput,
} from "../../types/graphql";
import { encodeGlobalId, validateAndDecodeGlobalId } from "../../utils";
import { InternalServerError, NotFoundError } from "../../utils/errors";
import { UserService } from "../user.service";
import { UserRecordsRepository } from "./user-records.repository";

@Injectable()
export class UserRecordsService
  implements EntityService<typeof UserRecordsTable, PgUserRecord, GqlUserRecord>
{
  constructor(
    private userService: UserService,
    private challengeService: ChallengeService,
    private userRecordsRepository: UserRecordsRepository
  ) {}

  public getTypename(): EntityType {
    return "UserRecord";
  }

  public pg2GqlMapper(
    pgUserRecord: PgUserRecord & { user: PgUser },
    challenge?: Challenge,
    activity?: ChallengeActivity,
    activityResult?: ChallengeActivityResult
  ): GqlUserRecord {
    return {
      ...pgUserRecord,
      id: encodeGlobalId(this.getTypename(), pgUserRecord.id),
      user: this.userService.pg2GqlMapper(pgUserRecord.user),
      challenge: challenge ?? ({} as Challenge),
      activity: activity ?? ({} as ChallengeActivity),
      activityResult: activityResult ?? ({} as ChallengeActivityResult),
    };
  }

  private async loadRelations(
    baseRecord: PgUserRecord & { user: PgUser }
  ): Promise<GqlUserRecord> {
    const challenge = await this.challengeService.findById(
      baseRecord.challengeId
    );

    if (!challenge) {
      throw new InternalServerError("Failed to load challenge relation");
    }

    const activityResultId = encodeGlobalId(
      "ChallengeActivityResult",
      baseRecord.activityResultId
    );
    const activityResult = challenge.activityTopResults?.edges?.find(
      (edge) => edge.node.id === activityResultId
    )?.node;

    if (!activityResult) {
      throw new InternalServerError("Failed to load activity result relation");
    }

    return this.pg2GqlMapper(
      baseRecord,
      challenge,
      challenge.activity,
      activityResult
    );
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

    return this.loadRelations(userRecord);
  }

  async findById(id: number): Promise<GqlUserRecord> {
    const userRecord = await this.userRecordsRepository.findById(id);

    if (!userRecord) {
      throw new NotFoundError(`UserRecord with id ${id} not found`);
    }

    return this.loadRelations(userRecord);
  }

  async findByUserId(userId: number): Promise<GqlUserRecord> {
    const userRecord = await this.userRecordsRepository.findByUserId(userId);

    if (!userRecord) {
      throw new NotFoundError(`UserRecord with userId ${userId} not found`);
    }

    return this.loadRelations(userRecord);
  }

  async delete(id: string): Promise<boolean> {
    const decodedId = validateAndDecodeGlobalId(id, this.getTypename());
    // eslint-disable-next-line drizzle/enforce-delete-with-where
    return this.userRecordsRepository.delete(decodedId);
  }
}
