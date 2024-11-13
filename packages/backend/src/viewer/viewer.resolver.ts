import { Args, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { ChallengesService } from "../challenges/challenges.service";
import { CommunitiesService } from "../communities/communities.service";
import { CurrentUser } from "../decorators/current-user.decorator";
import { Challenge, Community, User, Viewer } from "../types/graphql";
import { UsersService } from "../users/users.service";
import { validateAndDecodeGlobalId } from "../utils";

@Resolver("Viewer")
export class ViewerResolver {
  constructor(
    private usersService: UsersService,
    private communitiesService: CommunitiesService,
    private challengesService: ChallengesService
  ) {}

  @Query("viewer")
  async getViewer(
    @CurrentUser("userId") userId: number
  ): Promise<Viewer | undefined> {
    const v: Viewer = {
      user: await this.usersService.findById(userId),
    };

    return v;
  }

  @ResolveField()
  async user(@CurrentUser("userId") userId: number): Promise<User | undefined> {
    return this.usersService.findById(userId);
  }

  @ResolveField()
  async communities(
    @CurrentUser("userId") userId: number
  ): Promise<Community[]> {
    return this.communitiesService.findUserCommunities(userId);
  }

  @ResolveField()
  async challenges(
    @Args("communityId") communityGlobalId: string
  ): Promise<Challenge[]> {
    const communityId = validateAndDecodeGlobalId(
      communityGlobalId,
      "Community"
    );
    return await this.challengesService.findCommunityChallenges(communityId);
  }

  @ResolveField()
  async challenge(@Args("challengeId") challengeGlobalId: string) {
    const challengeId = validateAndDecodeGlobalId(
      challengeGlobalId,
      "Challenge"
    );
    return await this.challengesService.findById(challengeId);
  }
}
