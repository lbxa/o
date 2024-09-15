import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { eq } from "drizzle-orm";

import { DbService } from "../db/db.service";
import { communities, NewCommunity, userCommunities } from "../db/schema";
import { CurrentUser } from "../decorators/current-user.decorator";
import { Community } from "../types/graphql";
import { encodeGlobalId } from "../utils";

@Resolver("Community")
export class CommunitiesResolver {
  constructor(private dbService: DbService) {}

  @Query("community")
  async getCommunity(@Args("id") id: number): Promise<Community> {
    const [community] = await this.dbService.db
      .select()
      .from(communities)
      .where(eq(communities.id, id));

    const globalId = encodeGlobalId("Community", community.id);

    return { ...community, id: globalId };
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

    return this.getCommunity(result.insertId);
  }
}
