import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { $DrizzleSchema } from "@o/db";

import { DbService } from "../db/db.service";
import { CurrentUser } from "../decorators/current-user.decorator";
import {
  Challenge,
  ChallengeActivityCreateInput,
  ChallengeCreateInput,
  ChallengeCreatePayload,
  ChallengeInvitation,
  ChallengeUpdateInput,
  User,
  UserConnection,
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
    private challengeMembershipsService: ChallengeMembershipsService,
    private dbService: DbService<typeof $DrizzleSchema>
  ) {}

  @Query("challenge")
  async challenge(@Args("id") id: string): Promise<Challenge> {
    const challengeId = validateAndDecodeGlobalId(id, "Challenge");
    return this.challengeService.findById(challengeId);
  }

  @ResolveField("memberCount")
  async memberCount(@Parent() challenge: Challenge): Promise<number> {
    const challengeId = validateAndDecodeGlobalId(challenge.id, "Challenge");
    return this.challengeMembershipsService.getMemberCount(challengeId);
  }

  @ResolveField("firstMember")
  async firstMember(
    @Parent() challenge: Challenge,
    @CurrentUser("userId") viewerId: number
  ): Promise<User | undefined> {
    const decodedChallengeId = validateAndDecodeGlobalId(
      challenge.id,
      "Challenge"
    );

    const members = await this.challengeMembershipsService.getMembers({
      challengeId: decodedChallengeId,
      viewerId,
    });

    return members.edges?.[0]?.node;
  }

  @ResolveField("secondMember")
  async secondMember(
    @Parent() challenge: Challenge,
    @CurrentUser("userId") viewerId: number
  ): Promise<User | undefined> {
    const decodedChallengeId = validateAndDecodeGlobalId(
      challenge.id,
      "Challenge"
    );

    const members = await this.challengeMembershipsService.getMembers({
      challengeId: decodedChallengeId,
      viewerId,
    });

    return members.edges?.[1]?.node;
  }

  @ResolveField("allMembers")
  async allMembers(
    @Parent() challenge: Challenge,
    @CurrentUser("userId") viewerId: number,
    @Args("first") first: number,
    @Args("after") after?: string
  ): Promise<UserConnection> {
    const decodedChallengeId = validateAndDecodeGlobalId(
      challenge.id,
      "Challenge"
    );
    return this.challengeMembershipsService.getMembers(
      { challengeId: decodedChallengeId, viewerId },
      { first, after }
    );
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
      { ...activityInput }
    );

    return {
      challengeEdge: {
        __typename: "ChallengeEdge",
        cursor: newChallenge.id,
        node: newChallenge,
      },
    };
  }

  @Mutation("challengeUpdate")
  async challengeUpdate(
    @Args("challengeUpdateInput") challengeInput: ChallengeUpdateInput
  ): Promise<Challenge> {
    return this.challengeService.update(challengeInput);
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
    return this.challengeMembershipsService.join(userId, {
      inviteId: decodedInviteId,
    });
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
