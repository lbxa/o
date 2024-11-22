import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { CurrentUser } from "../decorators/current-user.decorator";
import {
  Challenge,
  ChallengeActivityCreateInput,
  ChallengeCreateInput,
  ChallengeCreatePayload,
  ChallengeInvitation,
} from "../types/graphql";
import { validateAndDecodeGlobalId } from "../utils";
import { ChallengeService } from "./challenge.service";
import { ChallengeInvitationsService } from "./challenge-invitations";
import { ChallengeMembershipsService } from "./challenge-memberships";

@Resolver("Challenge")
export class ChallengeResolver {
  constructor(
    private challengeService: ChallengeService,
    private challengeInvitationsService: ChallengeInvitationsService,
    private challengeMembershipsService: ChallengeMembershipsService
  ) {}

  @Query("challenge")
  async challenge(@Args("id") id: string): Promise<Challenge> {
    const challengeId = validateAndDecodeGlobalId(id, "Challenge");
    return this.challengeService.findById(challengeId);
  }

  @Mutation("challengeCreate")
  async challengeCreate(
    @Args("challengeCreateInput") challengeInput: ChallengeCreateInput,
    @Args("challengeActivityCreateInput")
    activityInput: ChallengeActivityCreateInput,
    @CurrentUser("userId") userId: number
  ): Promise<ChallengeCreatePayload> {
    const communityId = validateAndDecodeGlobalId(
      challengeInput.communityId,
      "Community"
    );
    const newChallenge = await this.challengeService.create(
      { ...challengeInput, communityId, ownerId: userId },
      { ...activityInput },
      userId
    );

    return {
      challengeEdge: {
        __typename: "ChallengeEdge",
        cursor: newChallenge.id,
        node: newChallenge,
      },
    };
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
    await this.challengeService.leave(userId, decodedChallengeId);
    return true;
  }

  @Mutation("challengeDelete")
  async challengeDelete(
    @Args("id") id: string,
    @CurrentUser("userId") userId: number
  ): Promise<boolean> {
    const decodedChallengeId = validateAndDecodeGlobalId(id, "Challenge");
    return this.challengeService.remove(decodedChallengeId, userId);
  }
}
