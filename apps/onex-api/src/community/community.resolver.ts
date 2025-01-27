import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import {
  $DrizzleSchema,
  CommunitiesTable,
  CommunityMembershipsTable,
  NewCommunity,
} from "@o/db";
import { eq } from "drizzle-orm";

import { CommunityRepository } from "@/community/community.repository";

import { ChallengeService } from "../challenge/challenge.service";
import { DbService } from "../db/db.service";
import { CurrentUser } from "../decorators/current-user.decorator";
import {
  ChallengeConnection,
  Community as GqlCommunity,
  CommunityCreatePayload,
  CommunityInvitationConnection,
  CommunityInviteDeclinePayload,
  CommunityJoinPayload,
  CommunityUpdateInput,
  User as GqlUser,
  UserConnection,
} from "../types/graphql";
import { encodeGlobalId, validateAndDecodeGlobalId } from "../utils";
import { ConflictError, InternalServerError } from "../utils/errors";
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

  @ResolveField("firstMember")
  async firstMember(
    @Parent() community: GqlCommunity,
    @CurrentUser("userId") viewerId: number
  ): Promise<GqlUser | undefined> {
    const decodedCommunityId = validateAndDecodeGlobalId(
      community.id,
      "Community"
    );

    const members = await this.communityMembershipsService.getMembers({
      communityId: decodedCommunityId,
      viewerId,
    });

    return members.edges?.[0]?.node;
  }

  @ResolveField("secondMember")
  async secondMember(
    @Parent() community: GqlCommunity,
    @CurrentUser("userId") viewerId: number
  ): Promise<GqlUser | undefined> {
    const decodedCommunityId = validateAndDecodeGlobalId(
      community.id,
      "Community"
    );

    const members = await this.communityMembershipsService.getMembers({
      communityId: decodedCommunityId,
      viewerId,
    });

    return members.edges?.[1]?.node;
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
    @Args("communityCreateInput") input: NewCommunity,
    @CurrentUser("userId") userId: number
  ): Promise<CommunityCreatePayload | undefined> {
    const existing = await this.dbService.db.query.CommunitiesTable.findFirst({
      where: eq(CommunitiesTable.name, input.name),
    });

    if (existing) {
      throw new ConflictError("Community name already taken");
    }

    const [newCommunity] = await this.dbService.db
      .insert(CommunitiesTable)
      .values({ ...input, ownerId: userId })
      .returning();

    const communityWithRelations = await this.communityRepository.findById(
      newCommunity.id
    );

    if (!newCommunity || !communityWithRelations) {
      throw new InternalServerError("Failed to create community membership");
    }

    await this.dbService.db
      .insert(CommunityMembershipsTable)
      .values({ userId, communityId: newCommunity.id, isAdmin: true });

    return {
      communityEdge: {
        __typename: "CommunityEdge",
        cursor: encodeGlobalId("Community", newCommunity.id),
        node: this.communityService.pg2GqlMapper(communityWithRelations),
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
