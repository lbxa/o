import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { eq } from "drizzle-orm";

import { DbService } from "../db/db.service";
import {
  communities,
  Community,
  NewCommunity,
  userCommunities,
} from "../db/schema";
import { CurrentUser } from "../decorators/current-user.decorator";

@Resolver("Community")
export class CommunitiesResolver {
  constructor(private dbService: DbService) {}

  @Query("community")
  async getCommunity(@Args("id") id: number): Promise<Community> {
    const [community] = await this.dbService.db
      .select()
      .from(communities)
      .where(eq(communities.id, id));
    return community;
  }

  @Query("communities")
  async getAllCommunities(): Promise<Community[]> {
    return this.dbService.db.select().from(communities);
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

    return this.getCommunity(result.insertId);
  }
}
