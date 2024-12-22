import { Injectable, NotFoundException } from "@nestjs/common";
import {
  CommunitiesTable,
  Community as PgCommunity,
  CommunityMembershipsTable,
  NewCommunity,
} from "@o/db";
import * as schema from "@o/db";
import { desc, eq } from "drizzle-orm";

import { DbService } from "../db/db.service";
import { EntityService } from "../entity/entity-service";
import {
  Community as GqlCommunity,
  CommunityConnection,
  CommunityUpdateInput,
} from "../types/graphql";
import { encodeGlobalId, validateAndDecodeGlobalId } from "../utils";
import { NotFoundError } from "../utils/errors";

@Injectable()
export class CommunityService
  implements EntityService<typeof CommunitiesTable, PgCommunity, GqlCommunity>
{
  constructor(private dbService: DbService<typeof schema>) {}

  public getTypename(): string {
    return "Community";
  }

  public pg2GqlMapper(community: PgCommunity): GqlCommunity {
    return {
      ...community,
      id: encodeGlobalId("Community", community.id),
    };
  }

  async findById(id: number): Promise<GqlCommunity | undefined> {
    const community = await this.dbService.db.query.CommunitiesTable.findFirst({
      where: eq(CommunitiesTable.id, id),
    });

    if (!community) {
      throw new NotFoundException(`Community with id ${id} not found`);
    }

    return this.pg2GqlMapper(community);
  }

  async findAll(): Promise<GqlCommunity[]> {
    const allCommunities =
      await this.dbService.db.query.CommunitiesTable.findMany();

    return allCommunities.map((community) => this.pg2GqlMapper(community));
  }

  async findUserCommunities(
    userId: number,
    first: number,
    after?: string
  ): Promise<CommunityConnection> {
    const startCursorId = after
      ? validateAndDecodeGlobalId(after, "Community")
      : 0;

    const communities = await this.dbService.db
      .select({
        userCommunity: CommunitiesTable,
      })
      .from(CommunityMembershipsTable)
      .innerJoin(
        CommunitiesTable,
        eq(CommunitiesTable.id, CommunityMembershipsTable.communityId)
      )
      .where(eq(CommunityMembershipsTable.userId, userId))
      .orderBy(desc(CommunitiesTable.createdAt))
      .offset(startCursorId)
      .limit(first + 1); // Fetch one extra to check for next page

    const edges = communities.slice(0, first).map((community) => ({
      node: this.pg2GqlMapper(community.userCommunity),
      cursor: encodeGlobalId("Community", community.userCommunity.id),
    }));

    // Determine if there is a next page
    const hasNextPage = communities.length > first;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;

    return {
      edges,
      pageInfo: {
        startCursor,
        endCursor,
        hasNextPage,
        hasPreviousPage: startCursorId > 0,
      },
    };
  }

  async create(input: NewCommunity, userId: number): Promise<GqlCommunity> {
    const [result] = await this.dbService.db
      .insert(CommunitiesTable)
      .values({ ...input, ownerId: userId })
      .returning();

    await this.dbService.db
      .insert(CommunityMembershipsTable)
      .values({ userId, communityId: result.id, isAdmin: true });

    return this.pg2GqlMapper(result);
  }

  async update(input: CommunityUpdateInput): Promise<GqlCommunity> {
    const { id: globalId, ...updates } = input;
    const id = validateAndDecodeGlobalId(globalId, "Community");

    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== null)
    );

    const [updated] = await this.dbService.db
      .update(CommunitiesTable)
      .set(filteredUpdates)
      .where(eq(CommunitiesTable.id, id))
      .returning();

    if (!updated) {
      throw new NotFoundError(`Community with id ${id} not found`);
    }

    return this.pg2GqlMapper(updated);
  }

  async remove(id: number): Promise<boolean> {
    await this.dbService.db
      .delete(CommunitiesTable)
      .where(eq(CommunitiesTable.id, id));
    return true;
  }
}
