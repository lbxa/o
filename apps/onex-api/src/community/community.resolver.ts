import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { $DrizzleSchema } from "@o/db";

import { CommunityRepository } from "@/community/community.repository";

import { ChallengeService } from "../challenge/challenge.service";
import { DbService } from "../db/db.service";
import { CurrentUser } from "../decorators/current-user.decorator";
import {
  ChallengeConnection,
  Community as GqlCommunity,
  CommunityCreateInput,
  CommunityCreatePayload,
  CommunityInvitationConnection,
  CommunityInviteDeclinePayload,
  CommunityJoinPayload,
  CommunityUpdateInput,
  ImageSize,
  User as GqlUser,
  UserConnection,
} from "../types/graphql";
import { validateAndDecodeGlobalId } from "../utils";
import { CommunityService } from "./community.service";
import { CommunityInvitationsService } from "./community-invitations";
import { CommunityMembershipsService } from "./community-memberships";

@Resolver("Community")
export class CommunityResolver {
  constructor(
    private dbService: DbService<typeof $DrizzleSchema>,
    private communityService: CommunityService,
    private communityMembershipsService: CommunityMembershipsService,
    private communityInvitationsService: CommunityInvitationsService,
    private communityRepository: CommunityRepository,
    private challengeService: ChallengeService
  ) {}

  @ResolveField("imageUrl")
  async imageUrl(
    @Parent() community: GqlCommunity,
    @Args("size") size: ImageSize = ImageSize.MEDIUM
  ): Promise<string | null> {
    if (!community.imageUrl) {
      return null;
    }

    const decodedCommunityId = validateAndDecodeGlobalId(
      community.id,
      "Community"
    );
    const communityData =
      await this.communityRepository.findById(decodedCommunityId);

    if (!communityData?.imageUrl) {
      return null;
    }

    switch (size) {
      case ImageSize.SMALL:
        return communityData.imageUrl.small;
      case ImageSize.MEDIUM:
        return communityData.imageUrl.medium;
      case ImageSize.LARGE:
        return communityData.imageUrl.large;
      case ImageSize.THUMBNAIL:
        return communityData.imageUrl.thumbnail;
      default:
        return communityData.imageUrl.medium;
    }
  }

  @ResolveField()
  async challenges(
    @Parent() community: GqlCommunity,
    @Args("first") first: number,
    @Args("after") after: string
  ): Promise<ChallengeConnection> {
    const communityId = validateAndDecodeGlobalId(community.id, "Community");
    return this.challengeService.findCommunityChallenges(
      communityId,
      first,
      after
    );
  }

  @Mutation("communityUpdate")
  async communityUpdate(
    @Args("communityUpdateInput") input: CommunityUpdateInput
  ): Promise<GqlCommunity> {
    return this.communityService.update(input);
  }

  @Mutation("communityInvite")
  async communityInvite(
    @Args("communityId") communityId: string,
    @Args("userId") userId: string,
    @CurrentUser("userId") inviterId: number
  ): Promise<boolean> {
    const decodedCommunityId = validateAndDecodeGlobalId(
      communityId,
      "Community"
    );
    const decodedUserId = validateAndDecodeGlobalId(userId, "User");
    return this.communityInvitationsService.invite({
      inviteeId: decodedUserId,
      inviterId,
      communityId: decodedCommunityId,
    });
  }

  @ResolveField()
  async invitations(
    @CurrentUser("userId") userId: number,
    @Parent() community: GqlCommunity,
    @Args("first") first: number,
    @Args("after") after?: string
  ): Promise<CommunityInvitationConnection> {
    const decodedCommunityId = validateAndDecodeGlobalId(
      community.id,
      "Community"
    );
    return this.communityInvitationsService.findUserInvitationsReceived({
      userId,
      forCommunityId: decodedCommunityId,
      first,
      after,
    });
  }

  @ResolveField()
  async memberCount(@Parent() community: GqlCommunity): Promise<number> {
    const decodedCommunityId = validateAndDecodeGlobalId(
      community.id,
      "Community"
    );
    return this.communityMembershipsService.memberCount(decodedCommunityId);
  }

  @ResolveField("firstThreeMembers")
  async firstThreeMembers(
    @Parent() community: GqlCommunity,
    @CurrentUser("userId") viewerId: number
  ): Promise<GqlUser[]> {
    const decodedCommunityId = validateAndDecodeGlobalId(
      community.id,
      "Community"
    );

    const members = await this.communityMembershipsService.getMembers({
      communityId: decodedCommunityId,
      viewerId,
    });

    return members.edges?.slice(0, 3).map((edge) => edge.node) ?? [];
  }

  @ResolveField("allMembers")
  async allMembers(
    @Parent() community: GqlCommunity,
    @CurrentUser("userId") viewerId: number,
    @Args("first") first: number,
    @Args("after") after?: string
  ): Promise<UserConnection> {
    const decodedCommunityId = validateAndDecodeGlobalId(
      community.id,
      "Community"
    );
    return this.communityMembershipsService.getMembers(
      { communityId: decodedCommunityId, viewerId },
      { first, after }
    );
  }

  @Mutation("communityJoin")
  async communityJoin(
    @Args("inviteId") inviteId: string,
    @CurrentUser("userId") userId: number
  ): Promise<CommunityJoinPayload | undefined> {
    const decodedInviteId = validateAndDecodeGlobalId(
      inviteId,
      "CommunityInvitation"
    );
    return this.communityMembershipsService.join(userId, decodedInviteId);
  }

  @Mutation("communityLeave")
  async communityLeave(
    @Args("id") id: string,
    @CurrentUser("userId") userId: number
  ): Promise<boolean> {
    const decodedCommunityId = validateAndDecodeGlobalId(id, "Community");
    await this.communityMembershipsService.leave(userId, decodedCommunityId);
    return true;
  }

  // TODO
  // - test for admin role
  // - remove all active memberships
  // - remove all pending invitations
  @Mutation("communityDelete")
  async communityDelete(
    @Args("id") id: string,
    @CurrentUser("userId") userId: number
  ): Promise<boolean> {
    const decodedCommunityId = validateAndDecodeGlobalId(id, "Community");
    await this.communityMembershipsService.leave(userId, decodedCommunityId);
    return this.communityService.remove(decodedCommunityId);
  }

  @Mutation("communityCreate")
  async communityCreate(
    @Args("communityCreateInput") input: CommunityCreateInput,
    @CurrentUser("userId") userId: number
  ): Promise<CommunityCreatePayload | undefined> {
    const community = await this.communityService.create(input, userId);

    return {
      communityEdge: {
        __typename: "CommunityEdge",
        cursor: community.id,
        node: community,
      },
    };
  }

  @Mutation("communityInviteDecline")
  async communityInviteDecline(
    @Args("inviteId") inviteId: string,
    @CurrentUser("userId") userId: number
  ): Promise<CommunityInviteDeclinePayload> {
    const decodedInviteId = validateAndDecodeGlobalId(
      inviteId,
      "CommunityInvitation"
    );
    return this.communityInvitationsService.declineInvitation(
      userId,
      decodedInviteId
    );
  }
}
