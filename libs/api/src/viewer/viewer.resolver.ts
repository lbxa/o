import { Args, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { ChallengeService } from "../challenge/challenge.service";
import { CommunityService } from "../community/community.service";
import { CommunityInvitationsService } from "../community/community-invitations";
import { CurrentUser } from "../decorators/current-user.decorator";
import {
  ChallengeConnection,
  Community,
  CommunityConnection,
  CommunityInvitationConnection,
  User,
  Viewer,
} from "../types/graphql";
import { UserService } from "../user/user.service";
import { encodeGlobalId, validateAndDecodeGlobalId } from "../utils";

@Resolver("Viewer")
export class ViewerResolver {
  constructor(
    private userService: UserService,
    private communityService: CommunityService,
    private communityInvitationsService: CommunityInvitationsService,
    private challengeService: ChallengeService
  ) {}

  @Query("viewer")
  async getViewer(
    @CurrentUser("userId") userId: number
  ): Promise<Viewer | undefined> {
    const v: Viewer = {
      id: encodeGlobalId("Viewer", userId),
      user: await this.userService.findById(userId),
      communities: await this.communityService.findUserCommunities(userId, 0),
    };

    return v;
  }

  @ResolveField()
  async user(@CurrentUser("userId") userId: number): Promise<User | undefined> {
    return this.userService.findById(userId);
  }

  @ResolveField()
  async community(
    @Args("communityId") communityId: string
  ): Promise<Community | undefined> {
    const id = validateAndDecodeGlobalId(communityId, "Community");
    return this.communityService.findById(id);
  }

  @ResolveField()
  async communities(
    @CurrentUser("userId") userId: number,
    @Args("first") first: number,
    @Args("after") after?: string
  ): Promise<CommunityConnection> {
    const userCommunities = await this.communityService.findUserCommunities(
      userId,
      first,
      after
    );

    return userCommunities;
  }

  @ResolveField()
  async communityInvitations(
    @CurrentUser("userId") userId: number,
    @Args("first") first: number,
    @Args("after") after?: string
  ): Promise<CommunityInvitationConnection> {
    return this.communityInvitationsService.findUserInvitationsReceived({
      userId,
      first,
      after,
    });
  }

  @ResolveField()
  async challenges(
    @Args("communityId") communityGlobalId: string,
    @Args("first") first: number,
    @Args("after") after?: string
  ): Promise<ChallengeConnection> {
    const communityId = validateAndDecodeGlobalId(
      communityGlobalId,
      "Community"
    );
    return await this.challengeService.findCommunityChallenges(
      communityId,
      first,
      after
    );
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
