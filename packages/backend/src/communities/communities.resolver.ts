import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  CommunitiesTable,
  CommunityMembershipsTable,
  NewCommunity,
} from "@o/db";

import { DbService } from "../db/db.service";
import { CurrentUser } from "../decorators/current-user.decorator";
import { Community, CommunityInvitation } from "../types/graphql";
import { encodeGlobalId, validateAndDecodeGlobalId } from "../utils";
import { CommunitiesService } from "./communities.service";

@Resolver("Community")
export class CommunitiesResolver {
  constructor(
    private dbService: DbService,
    private communitiesService: CommunitiesService
  ) {}

  @Query("community")
  async getCommunity(@Args("id") id: string): Promise<Community> {
    const communityId = validateAndDecodeGlobalId(id, "Community");
    const community = this.communitiesService.findOne(communityId);

    return community;
  }

  @Query("communities")
  async getAllCommunities(): Promise<Community[]> {
    return (await this.dbService.db.select().from(CommunitiesTable)).map(
      (community) => ({
        ...community,
        id: encodeGlobalId("Community", community.id),
      })
    );
  }

  // TODO
  // @Query("userCommunities")
  // async getUserCommunities(
  //   @Args("userId") userId: string
  // ): Promise<Community[]> {
  //   const decodedUserId = validateAndDecodeGlobalId(userId, "User");
  //   return this.communitiesService.findUserCommunities(decodedUserId);
  // }

  @Mutation("communityInvite")
  async inviteToCommunity(
    @Args("communityId") communityId: number,
    @Args("userId") userId: number,
    @CurrentUser("userId") inviterId: number
  ): Promise<boolean> {
    return this.communitiesService.invite(userId, communityId, inviterId);
  }

  @Query("communityInvitations")
  getCommunityInvitations(
    @Args("userId") userId: number
  ): Promise<CommunityInvitation[]> {
    return this.communitiesService.findUserInvitations(userId);
  }

  @Mutation("communityJoin")
  async joinCommunity(
    @Args("inviteId") inviteId: number,
    @CurrentUser("userId") userId: number
  ): Promise<Community> {
    return this.communitiesService.join(userId, inviteId);
  }

  @Mutation("communityLeave")
  async leaveCommunity(
    @Args("id") id: string,
    @CurrentUser("userId") userId: number
  ): Promise<boolean> {
    const decodedCommunityId = validateAndDecodeGlobalId(id, "Community");
    await this.communitiesService.leave(userId, decodedCommunityId);
    return true;
  }

  @Mutation("communityCreate")
  async createCommunity(
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
