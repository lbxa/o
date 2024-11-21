import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";

import { CurrentUser } from "../../decorators/current-user.decorator";
import {
  Challenge,
  ChallengeActivityResult,
  ChallengeActivityResultCreateInput,
} from "../../types/graphql";
import { validateAndDecodeGlobalId } from "../../utils";
import { ChallengeActivityResultsService } from "./challenge-activity-results.service";

/**
 * Extends the @type Challenge to include activity results. Still belongs
 * in its own code file to keep things clean.
 */
@Resolver("Challenge")
export class ChallengeActivityResultsResolver {
  constructor(
    private challengeActivityResultsService: ChallengeActivityResultsService
  ) {}

  @Query("challengeActivityResults")
  async challengeActivityResults(
    @Args("challengeId") challengeId: string
  ): Promise<ChallengeActivityResult[]> {
    const decodedChallengeId = validateAndDecodeGlobalId(
      challengeId,
      "Challenge"
    );
    return this.challengeActivityResultsService.findAll({
      challengeId: decodedChallengeId,
    });
  }

  @Query("challengeActivityTopResults")
  async challengeActivityTopResults(
    @Args("challengeId") challengeId: string
  ): Promise<ChallengeActivityResult[]> {
    const decodedChallengeId = validateAndDecodeGlobalId(
      challengeId,
      "Challenge"
    );
    return this.challengeActivityResultsService.fetchTopResults({
      challengeId: decodedChallengeId,
    });
  }

  @ResolveField("activityTopResults")
  async activityTopResults(
    @Parent() challenge: Challenge,
    @Args("challengeId") challengeId?: string
  ) {
    const decodedChallengeId = validateAndDecodeGlobalId(
      challengeId ?? challenge.id,
      "Challenge"
    );
    return this.challengeActivityResultsService.fetchTopResults({
      challengeId: decodedChallengeId,
    });
  }

  @Mutation("challengeActivityResultCreate")
  async challengeActivityResultCreate(
    @Args("challengeActivityResultCreateInput")
    resultInput: ChallengeActivityResultCreateInput,
    @CurrentUser("userId") userId: number
  ): Promise<ChallengeActivityResult> {
    const activityId = validateAndDecodeGlobalId(
      resultInput.activityId,
      "ChallengeActivity"
    );
    const challengeId = validateAndDecodeGlobalId(
      resultInput.challengeId,
      "Challenge"
    );
    return this.challengeActivityResultsService.create({
      ...resultInput,
      activityId,
      userId,
      challengeId,
    });
  }
}
