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
  ChallengeActivityResultConnection,
  ChallengeActivityResultCreateInput,
  ChallengeActivityTopMoverConnection,
  CreateChallengeActivityResultPayload,
} from "../../types/graphql";
import { validateAndDecodeGlobalId } from "../../utils";
import { ChallengeActivityResultsService } from "./challenge-activity-results.service";

/**
 * Extends the @type Challenge to include activity results. Still belongs
 * in its own code file to keep things clean.
 *
 * TODO | change of mind: this is terrible, move it back to the
 * TODO | challenge.resolver.ts file
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
    @Args("challengeId") challengeId: string,
    @Args("first") first: number,
    @Args("after") after: string
  ): Promise<ChallengeActivityResultConnection> {
    const decodedChallengeId = validateAndDecodeGlobalId(
      challengeId,
      "Challenge"
    );
    return this.challengeActivityResultsService.fetchTopResults(
      {
        challengeId: decodedChallengeId,
      },
      {
        first,
        after,
      }
    );
  }

  @ResolveField("activityTopResults")
  async activityTopResults(
    @Parent() challenge: Challenge,
    @Args("first") first: number,
    @Args("after") after?: string
  ): Promise<ChallengeActivityResultConnection> {
    const decodedChallengeId = validateAndDecodeGlobalId(
      challenge.id,
      "Challenge"
    );
    return this.challengeActivityResultsService.fetchTopResults(
      {
        challengeId: decodedChallengeId,
      },
      {
        first,
        after,
      }
    );
  }

  @Query("challengeActivityTopMovers")
  async challengeActivityTopMovers(
    @Args("challengeId") challengeId: string,
    @Args("first") first: number,
    @Args("after") after?: string
  ): Promise<ChallengeActivityTopMoverConnection> {
    const decodedChallengeId = validateAndDecodeGlobalId(
      challengeId,
      "Challenge"
    );
    return this.challengeActivityResultsService.fetchTopMovers(
      {
        challengeId: decodedChallengeId,
      },
      {
        first,
        after,
      }
    );
  }

  @ResolveField("activityTopMovers")
  async activityTopMovers(
    @Parent() challenge: Challenge,
    @Args("first") first: number,
    @Args("after") after?: string
  ): Promise<ChallengeActivityTopMoverConnection> {
    const decodedChallengeId = validateAndDecodeGlobalId(
      challenge.id,
      "Challenge"
    );
    console.log("Resolvers is being called");
    return this.challengeActivityResultsService.fetchTopMovers(
      {
        challengeId: decodedChallengeId,
      },
      {
        first,
        after,
      }
    );
  }

  @Mutation("challengeActivityResultCreate")
  async challengeActivityResultCreate(
    @Args("challengeActivityResultCreateInput")
    resultInput: ChallengeActivityResultCreateInput,
    @CurrentUser("userId") userId: number
  ): Promise<CreateChallengeActivityResultPayload> {
    const activityId = validateAndDecodeGlobalId(
      resultInput.activityId,
      "ChallengeActivity"
    );
    const challengeId = validateAndDecodeGlobalId(
      resultInput.challengeId,
      "Challenge"
    );

    const challengeActivityResult =
      await this.challengeActivityResultsService.create({
        ...resultInput,
        activityId,
        userId,
        challengeId,
      });

    return {
      challengeActivityResultEdge: {
        node: challengeActivityResult,
        cursor: challengeActivityResult.id,
      },
    };
  }
}
