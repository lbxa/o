import { Injectable } from "@nestjs/common";
import { communities, NewCommunity, userCommunities } from "@o/db";
import { and, eq } from "drizzle-orm";

import { DbService } from "../db/db.service";
import { Community } from "../types/graphql";
import { encodeGlobalId } from "../utils";

@Injectable()
export class CommunitiesService {
  constructor(private dbService: DbService) {}

  async findOne(id: number): Promise<Community> {
    const [community] = await this.dbService.db
      .select()
      .from(communities)
      .where(eq(communities.id, id));

    const globalId = encodeGlobalId("Community", community.id);
    return { ...community, id: globalId };
  }

  async findAll(): Promise<Community[]> {
    const allCommunities = await this.dbService.db.select().from(communities);
    return allCommunities.map((community) => ({
      ...community,
      id: encodeGlobalId("Community", community.id),
    }));
  }

  async create(input: NewCommunity, userId: number): Promise<Community> {
    const [result] = await this.dbService.db.insert(communities).values(input);
    await this.dbService.db
      .insert(userCommunities)
      .values({ userId, communityId: result.insertId });
    return this.findOne(result.insertId);
  }

  async update(id: number, input: Partial<NewCommunity>): Promise<Community> {
    await this.dbService.db
      .update(communities)
      .set(input)
      .where(eq(communities.id, id));
    return this.findOne(id);
  }

  async delete(id: number): Promise<Community> {
    const community = await this.findOne(id);
    await this.dbService.db.delete(communities).where(eq(communities.id, id));
    return community;
  }

  // invite(userId: number, communityId: number): Promise<Community> {
  //   // TODO: Implement invitation logic
  //   // This might involve creating a new table for invitations or directly adding to userCommunities with a 'pending' status
  //   throw new Error("Invitation functionality not implemented yet");
  // }

  async join(userId: number, communityId: number): Promise<Community> {
    await this.dbService.db
      .insert(userCommunities)
      .values({ userId, communityId });
    return this.findOne(communityId);
  }

  async leave(userId: number, communityId: number): Promise<Community> {
    await this.dbService.db
      .delete(userCommunities)
      .where(
        and(
          eq(userCommunities.userId, userId),
          eq(userCommunities.communityId, communityId)
        )
      );
    return this.findOne(communityId);
  }
}
