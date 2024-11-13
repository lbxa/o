import { Args, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { ChallengeService } from "../challenge/challenge.service";
import { CommunityService } from "../community/community.service";
import { CurrentUser } from "../decorators/current-user.decorator";
import { Challenge, Community, User, Viewer } from "../types/graphql";
import { UserService } from "../user/user.service";
import { validateAndDecodeGlobalId } from "../utils";

@Resolver("Viewer")
export class ViewerResolver {
  constructor(
    private userService: UserService,
    private communityService: CommunityService,
    private challengeService: ChallengeService
  ) {}

  @Query("viewer")
  async getViewer(
    @CurrentUser("userId") userId: number
  ): Promise<Viewer | undefined> {
    const v: Viewer = {
      user: await this.userService.findById(userId),
    };

    return v;
  }

  @ResolveField()
  async user(@CurrentUser("userId") userId: number): Promise<User | undefined> {
    return this.userService.findById(userId);
  }

  @ResolveField()
  async communities(
    @CurrentUser("userId") userId: number
  ): Promise<Community[]> {
    return this.communityService.findUserCommunities(userId);
  }

  @ResolveField()
  async challenges(
    @Args("communityId") communityGlobalId: string
  ): Promise<Challenge[]> {
    const communityId = validateAndDecodeGlobalId(
      communityGlobalId,
      "Community"
    );
    return await this.challengeService.findCommunityChallenges(communityId);
  }

  @ResolveField()
  async challenge(@Args("challengeId") challengeGlobalId: string) {
    const challengeId = validateAndDecodeGlobalId(
      challengeGlobalId,
      "Challenge"
    );
    return await this.challengeService.findById(challengeId);
  }
}
