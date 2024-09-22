import { Injectable } from "@nestjs/common";
import { CommunitiesTable, NewCommunity, CommunityMembershipsTable } from "@o/db";
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
      .from(CommunitiesTable)
      .where(eq(CommunitiesTable.id, id));

    const globalId = encodeGlobalId("Community", community.id);
    return { ...community, id: globalId };
  }

  async findAll(): Promise<Community[]> {
    const allCommunities = await this.dbService.db.select().from(CommunitiesTable);
    return allCommunities.map((community) => ({
      ...community,
      id: encodeGlobalId("Community", community.id),
    }));
  }

  async create(input: NewCommunity, userId: number): Promise<Community> {
    const [result] = await this.dbService.db.insert(CommunitiesTable).values(input);
    await this.dbService.db
      .insert(CommunityMembershipsTable)
      .values({ userId, communityId: result.insertId, isAdmin: true });
    return this.findOne(result.insertId);
  }

  async update(id: number, input: Partial<NewCommunity>): Promise<Community> {
    await this.dbService.db
      .update(CommunitiesTable)
      .set(input)
      .where(eq(CommunitiesTable.id, id));
    return this.findOne(id);
  }

  async delete(id: number): Promise<Community> {
    const community = await this.findOne(id);
    await this.dbService.db.delete(CommunitiesTable).where(eq(CommunitiesTable.id, id));
    return community;
  }

  // invite(userId: number, communityId: number): Promise<Community> {
  //   // TODO: Implement invitation logic
  //   // This might involve creating a new table for invitations or directly adding to userCommunities with a 'pending' status
  //   throw new Error("Invitation functionality not implemented yet");
  // }

  async join(userId: number, communityId: number): Promise<Community> {
    await this.dbService.db
      .insert(CommunityMembershipsTable)
      .values({ userId, communityId });
    return this.findOne(communityId);
  }

  async leave(userId: number, communityId: number): Promise<Community> {
    await this.dbService.db
      .delete(CommunityMembershipsTable)
      .where(
        and(
          eq(CommunityMembershipsTable.userId, userId),
          eq(CommunityMembershipsTable.communityId, communityId)
        )
      );
    return this.findOne(communityId);
  }
}
