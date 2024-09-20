import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { DbService } from "../db/db.service";
import { communities, NewCommunity, userCommunities } from "../db/schema";
import { CurrentUser } from "../decorators/current-user.decorator";
import { Community } from "../types/graphql";
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
    return (await this.dbService.db.select().from(communities)).map(
      (community) => ({
        ...community,
        id: encodeGlobalId("Community", community.id),
      })
    );
  }

  @Mutation("communityCreate")
  async createCommunity(
    @Args("communityCreateInput") input: NewCommunity,
    @CurrentUser("userId") userId: number
  ): Promise<Community> {
    const [result] = await this.dbService.db.insert(communities).values(input);

    await this.dbService.db
      .insert(userCommunities)
      .values({ userId, communityId: result.insertId });

    return this.communitiesService.findOne(result.insertId);
  }
}
