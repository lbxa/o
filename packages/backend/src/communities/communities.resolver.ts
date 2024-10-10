import { ParseIntPipe } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import {
  CommunitiesTable,
  CommunityMembershipsTable,
  NewCommunity,
} from "@o/db";

import { ChallengesService } from "../challenges/challenges.service";
import { DbService } from "../db/db.service";
import { CurrentUser } from "../decorators/current-user.decorator";
import { Challenge, Community, CommunityInvitation } from "../types/graphql";
import { encodeGlobalId, validateAndDecodeGlobalId } from "../utils";
import { CommunitiesService } from "./communities.service";

@Resolver("Community")
export class CommunitiesResolver {
  constructor(
    private dbService: DbService,
    private communitiesService: CommunitiesService,
    private challengesService: ChallengesService
  ) {}

  @ResolveField()
  async challenges(@Parent() community: Community): Promise<Challenge[]> {
    const communityId = validateAndDecodeGlobalId(community.id, "Community");
    return this.challengesService.findCommunityChallenges(communityId);
  }

  @Query("community")
  async community(@Args("id") id: string): Promise<Community> {
    const communityId = validateAndDecodeGlobalId(id, "Community");
    return this.communitiesService.findOne(communityId);
  }

  @Query("communities")
  async communities(): Promise<Community[]> {
    return (await this.dbService.db.select().from(CommunitiesTable)).map(
      (community) => ({
        ...community,
        id: encodeGlobalId("Community", community.id),
        name: community.name,
        isVerified: community.isVerified,
      })
    );
  }

  @Query("userCommunities")
  userCommunities(
    @Args("userId", ParseIntPipe) userId: number
  ): Promise<Community[]> {
    // const decodedUserId = validateAndDecodeGlobalId(userId, "User");
    return this.communitiesService.findUserCommunities(userId);
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
    return this.communitiesService.invite(
      decodedUserId,
      decodedCommunityId,
      inviterId
    );
  }

  @Query("communityInvitations")
  async communityInvitations(
    @Args("userId") userId: string
  ): Promise<CommunityInvitation[]> {
    const decodedUserId = validateAndDecodeGlobalId(userId, "User");
    return this.communitiesService.findUserInvitations(decodedUserId);
  }

  @Mutation("communityJoin")
  async communityJoin(
    @Args("inviteId") inviteId: string,
    @CurrentUser("userId") userId: number
  ): Promise<Community> {
    const decodedInviteId = validateAndDecodeGlobalId(
      inviteId,
      "CommunityInvitation"
    );
    return this.communitiesService.join(userId, decodedInviteId);
  }

  @Mutation("communityLeave")
  async communityLeave(
    @Args("id") id: string,
    @CurrentUser("userId") userId: number
  ): Promise<boolean> {
    const decodedCommunityId = validateAndDecodeGlobalId(id, "Community");
    await this.communitiesService.leave(userId, decodedCommunityId);
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
    await this.communitiesService.leave(userId, decodedCommunityId);
    return this.communitiesService.remove(decodedCommunityId);
  }

  @Mutation("communityCreate")
  async communityCreate(
    @Args("communityCreateInput") input: NewCommunity,
    @CurrentUser("userId") userId: number
  ): Promise<Community> {
    const [result] = await this.dbService.db
      .insert(CommunitiesTable)
      .values({ ...input, ownerId: userId });
    await this.dbService.db
      .insert(CommunityMembershipsTable)
      .values({ userId, communityId: result.insertId, isAdmin: true });
    return this.communitiesService.findOne(result.insertId);
  }
}
