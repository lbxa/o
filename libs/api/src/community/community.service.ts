import { Injectable, NotFoundException } from "@nestjs/common";
import {
  CommunitiesTable,
  Community as PgCommunity,
  CommunityInvitationsTable,
  CommunityMembershipsTable,
  NewCommunity,
} from "@o/db";
import * as schema from "@o/db";
import { and, desc, eq, getTableColumns } from "drizzle-orm";

import { DbService } from "../db/db.service";
import { EntityService } from "../entity/entity-service";
import {
  Community as GqlCommunity,
  CommunityConnection,
  CommunityJoinPayload,
  InvitationStatus,
} from "../types/graphql";
import { encodeGlobalId, validateAndDecodeGlobalId } from "../utils";
import { ForbiddenError, InternalServerError } from "../utils/errors";

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

  async update(
    id: number,
    input: Partial<NewCommunity>
  ): Promise<GqlCommunity> {
    const [updated] = await this.dbService.db
      .update(CommunitiesTable)
      .set(input)
      .where(eq(CommunitiesTable.id, id))
      .returning();

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!updated) {
      throw new NotFoundException(`Community with id ${id} not found`);
    }

    return this.pg2GqlMapper(updated);
  }

  async remove(id: number): Promise<boolean> {
    await this.dbService.db
      .delete(CommunitiesTable)
      .where(eq(CommunitiesTable.id, id));
    return true;
  }

  async join(
    userId: number,
    inviteId: number
  ): Promise<CommunityJoinPayload | undefined> {
    // again what a shame the relations API is letting us down here
    const [invitation] = await this.dbService.db
      .select({
        ...getTableColumns(CommunityInvitationsTable),
        community: CommunitiesTable,
      })
      .from(CommunityInvitationsTable)
      .innerJoin(
        CommunitiesTable,
        eq(CommunityInvitationsTable.communityId, CommunitiesTable.id)
      )
      .where(
        and(
          eq(CommunityInvitationsTable.id, inviteId),
          eq(CommunityInvitationsTable.inviteeId, userId)
        )
      )
      .limit(1);

    if (!invitation || invitation.inviteeId !== userId) {
      throw new ForbiddenError("Invalid invitation");
    }

    // TODO is this good design?
    // no! I already programmed idempotency into the pg layer
    // const alreadyMember = await this.dbService.db
    //   .select()
    //   .from(CommunityMembershipsTable)
    //   .where(
    //     and(
    //       eq(CommunityMembershipsTable.userId, userId),
    //       eq(CommunityMembershipsTable.communityId, invitation.communityId)
    //     )
    //   );

    // if (alreadyMember.length != 0) {
    //   throw new ForbiddenException("User already joined community");
    // }

    switch (invitation.status) {
      case InvitationStatus.DECLINED.valueOf():
        throw new ForbiddenError("Invitation has been declined");
      case InvitationStatus.ACCEPTED.valueOf():
      case InvitationStatus.PENDING.valueOf():
        // users can re-join communities the have already been invited to
        // does this mean the expiry is ignored for the invite
        break;
      default:
    }

    if (invitation.expiresAt < new Date()) {
      throw new ForbiddenError("Invitation has expired");
    }

    const [membership] = await this.dbService.db
      .insert(CommunityMembershipsTable)
      .values({ userId, communityId: invitation.communityId })
      .returning();

    if (!membership) {
      throw new InternalServerError("Failed to join community");
    }

    const [updatedInvitation] = await this.dbService.db
      .update(CommunityInvitationsTable)
      .set({ status: InvitationStatus.ACCEPTED })
      .where(eq(CommunityInvitationsTable.id, inviteId))
      .returning();

    if (!updatedInvitation) {
      throw new InternalServerError("Failed to update invitation record");
    }

    return {
      communityEdge: {
        __typename: "CommunityEdge",
        cursor: encodeGlobalId("Community", invitation.communityId),
        node: this.pg2GqlMapper(invitation.community),
      },
    };
  }

  async leave(userId: number, communityId: number): Promise<void> {
    await this.dbService.db
      .delete(CommunityMembershipsTable)
      .where(
        and(
          eq(CommunityMembershipsTable.userId, userId),
          eq(CommunityMembershipsTable.communityId, communityId)
        )
      );
  }
}
