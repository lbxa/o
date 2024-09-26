import { ParseIntPipe } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { NewChallenge } from "@o/db";

import { DbService } from "../db/db.service";
import { CurrentUser } from "../decorators/current-user.decorator";
import { Challenge, ChallengeInvitation } from "../types/graphql";
import { encodeGlobalId, validateAndDecodeGlobalId } from "../utils";
import { ChallengesService } from "./challenges.service";

@Resolver("Challenge")
export class ChallengesResolver {
  constructor(
    private dbService: DbService,
    private challengesService: ChallengesService
  ) {}

  @Query("challenge")
  async challenge(@Args("id") id: string): Promise<Challenge> {
    const challengeId = validateAndDecodeGlobalId(id, "Challenge");
    return this.challengesService.findOne(challengeId);
  }

  @Query("challenges")
  async challenges(): Promise<Challenge[]> {
    const challenges = await this.dbService.db.query.ChallengesTable.findMany();

    return challenges.map((challenge) => ({
      ...challenge,
      id: encodeGlobalId("Challenge", challenge.id),
    }));
  }

  @Query("communityChallenges")
  async communityChallenges(
    @Args("communityId") communityId: string
  ): Promise<Challenge[]> {
    const decodedCommunityId = validateAndDecodeGlobalId(
      communityId,
      "Community"
    );
    return this.challengesService.findCommunityChallenges(decodedCommunityId);
  }

  @Query("userChallenges")
  async userChallenges(@Args("userId") userId: string): Promise<Challenge[]> {
    const decodedUserId = validateAndDecodeGlobalId(userId, "User");
    return this.challengesService.findUserChallenges(decodedUserId);
  }

  @Mutation("challengeCreate")
  async challengeCreate(
    @Args("challengeCreateInput") input: NewChallenge,
    @CurrentUser("userId") userId: number
  ): Promise<Challenge> {
    return this.challengesService.create(input, userId);
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
    return this.challengesService.invite(
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
    return this.challengesService.findUserInvitations(decodedUserId);
  }

  @Mutation("challengeJoin")
  async challengeJoin(
    @Args("inviteId") inviteId: string,
    @CurrentUser("userId") userId: number
  ): Promise<Challenge> {
    const decodedInviteId = validateAndDecodeGlobalId(
      inviteId,
      "ChallengeInvitation"
    );
    return this.challengesService.join(userId, decodedInviteId);
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
}
