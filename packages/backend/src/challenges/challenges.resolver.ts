import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { CurrentUser } from "../decorators/current-user.decorator";
import {
  Challenge,
  ChallengeActivityCreateInput,
  ChallengeActivityResult,
  ChallengeActivityResultCreateInput,
  ChallengeCreateInput,
  ChallengeInvitation,
} from "../types/graphql";
import { validateAndDecodeGlobalId } from "../utils";
import { ChallengeActivityResultsService } from "./challenge-activity-results";
import { ChallengeInvitationsService } from "./challenge-invitations";
import { ChallengeMembershipsService } from "./challenge-memberships";
import { ChallengesService } from "./challenges.service";

@Resolver("Challenge")
export class ChallengesResolver {
  constructor(
    private challengesService: ChallengesService,
    private challengeActivityResultsService: ChallengeActivityResultsService,
    private challengeInvitationsService: ChallengeInvitationsService,
    private challengeMembershipsService: ChallengeMembershipsService
  ) {}

  @Query("challenge")
  async challenge(@Args("id") id: string): Promise<Challenge> {
    const challengeId = validateAndDecodeGlobalId(id, "Challenge");
    return this.challengesService.findOne(challengeId);
  }

  @Query("challenges")
  async challenges(): Promise<Challenge[]> {
    return this.challengesService.findAll();
  }

  @Query("userChallenges")
  async userChallenges(@Args("userId") userId: string): Promise<Challenge[]> {
    const decodedUserId = validateAndDecodeGlobalId(userId, "User");
    return this.challengesService.findUserChallenges(decodedUserId);
  }

  @Mutation("challengeCreate")
  async challengeCreate(
    @Args("challengeCreateInput") challengeInput: ChallengeCreateInput,
    @Args("challengeActivityCreateInput")
    activityInput: ChallengeActivityCreateInput,
    @CurrentUser("userId") userId: number
  ): Promise<Challenge> {
    const communityId = validateAndDecodeGlobalId(
      challengeInput.communityId,
      "Community"
    );
    return this.challengesService.create(
      { ...challengeInput, communityId },
      { ...activityInput },
      userId
    );
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

  @Mutation("challengeInvite")
  async challengeInvite(
    @Args("challengeId") challengeId: string,
    @Args("userId") userId: string,
    @CurrentUser("userId") inviterId: number
  ): Promise<boolean> {
    const decodedChallengeId = validateAndDecodeGlobalId(
      challengeId,
      "Challenge"
    );
    const decodedUserId = validateAndDecodeGlobalId(userId, "User");
    return this.challengeInvitationsService.invite(
      decodedUserId,
      inviterId,
      decodedChallengeId
    );
  }

  @Query("challengeInvitations")
  async challengeInvitations(
    @Args("userId") userId: string
  ): Promise<ChallengeInvitation[]> {
    const decodedUserId = validateAndDecodeGlobalId(userId, "User");
    return this.challengeInvitationsService.findUserInvitationsReceived(
      decodedUserId
    );
  }

  @Mutation("challengeJoin")
  async challengeJoin(
    @Args("inviteId") inviteId: string,
    @CurrentUser("userId") userId: number
  ): Promise<boolean> {
    const decodedInviteId = validateAndDecodeGlobalId(
      inviteId,
      "ChallengeInvitation"
    );
    return this.challengeMembershipsService.join(userId, decodedInviteId);
  }

  @Mutation("challengeLeave")
  async challengeLeave(
    @Args("id") id: string,
    @CurrentUser("userId") userId: number
  ): Promise<boolean> {
    const decodedChallengeId = validateAndDecodeGlobalId(id, "Challenge");
    await this.challengesService.leave(userId, decodedChallengeId);
    return true;
  }

  @Mutation("challengeDelete")
  async challengeDelete(
    @Args("id") id: string,
    @CurrentUser("userId") userId: number
  ): Promise<boolean> {
    const decodedChallengeId = validateAndDecodeGlobalId(id, "Challenge");
    return this.challengesService.remove(decodedChallengeId, userId);
  }

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
}
