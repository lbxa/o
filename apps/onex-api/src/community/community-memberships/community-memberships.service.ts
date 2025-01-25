/* eslint-disable @stylistic/js/max-len */
import { Injectable } from "@nestjs/common";
import {
  $DrizzleSchema,
  CommunitiesTable,
  CommunityInvitationsTable,
  CommunityMembership,
  CommunityMembershipsTable,
  UserFriendshipsTable,
  UsersTable,
} from "@o/db";
import { and, count, eq, getTableColumns, notInArray, sql } from "drizzle-orm";

import { DbService } from "@/db/db.service";
import type { User as GqlUser, UserConnection } from "@/types/graphql";
import { CommunityJoinPayload, InvitationStatus } from "@/types/graphql";
import { UserService } from "@/user/user.service";
import { fullTextSearch } from "@/user/utils";
import {
  buildConnection,
  ConnectionArgs,
  encodeGlobalId,
  validateAndDecodeGlobalId,
} from "@/utils";
import { ForbiddenError, InternalServerError } from "@/utils/errors";

import { CommunityService } from "../community.service";

@Injectable()
export class CommunityMembershipsService {
  constructor(
    private dbService: DbService<typeof $DrizzleSchema>,
    private communityService: CommunityService,
    private userService: UserService
  ) {}

  async findAll(communityId: number): Promise<CommunityMembership[]> {
    return this.dbService.db.query.CommunityMembershipsTable.findMany({
      where: eq(CommunityMembershipsTable.communityId, communityId),
    });
  }

  async nonMemberSearch(searchTerm: string): Promise<GqlUser[]> {
    const users = await fullTextSearch(this.dbService, searchTerm);

    const nonMembers =
      await this.dbService.db.query.CommunityMembershipsTable.findMany({
        where: notInArray(
          CommunityMembershipsTable.userId,
          users.map((user) => user.id)
        ),
        with: {
          user: true,
        },
      });

    return nonMembers.map((membership) =>
      this.userService.pg2GqlMapper(membership.user)
    );
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
        owner: UsersTable,
      })
      .from(CommunityInvitationsTable)
      .innerJoin(
        CommunitiesTable,
        eq(CommunityInvitationsTable.communityId, CommunitiesTable.id)
      )
      .innerJoin(UsersTable, eq(CommunitiesTable.ownerId, UsersTable.id))
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

    switch (invitation.status) {
      case InvitationStatus.DECLINED.valueOf():
        throw new ForbiddenError("Invitation has been declined");
      case InvitationStatus.ACCEPTED.valueOf():
      case InvitationStatus.PENDING.valueOf():
        // users can re-join communities they have already been invited to
        // does this mean the expiry is ignored for the invite
        break;
      default:
    }

    if (invitation.expiresAt < new Date()) {
      throw new ForbiddenError("Invitation has expired");
    }

    const [membership] = await this.dbService.db
      .insert(CommunityMembershipsTable)
      .values({
        userId,
        communityId: invitation.communityId,
        isAdmin: false,
        joinedAt: new Date(),
      })
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
      invitationId: encodeGlobalId("CommunityInvitation", inviteId),
      communityEdge: {
        __typename: "CommunityEdge",
        cursor: encodeGlobalId("Community", invitation.communityId),
        node: this.communityService.pg2GqlMapper({
          ...invitation.community,
          owner: invitation.owner,
        }),
      },
    };
  }

  async leave(userId: number, communityId: number): Promise<void> {
    const membership =
      await this.dbService.db.query.CommunityMembershipsTable.findFirst({
        where: and(
          eq(CommunityMembershipsTable.userId, userId),
          eq(CommunityMembershipsTable.communityId, communityId)
        ),
      });

    if (!membership) {
      throw new ForbiddenError("You are not a member of this community");
    }

    const community = await this.dbService.db.query.CommunitiesTable.findFirst({
      where: eq(CommunitiesTable.id, communityId),
    });

    if (community?.ownerId === userId) {
      throw new ForbiddenError("Cannot leave community - you are the owner");
    }

    await this.dbService.db
      .delete(CommunityMembershipsTable)
      .where(
        and(
          eq(CommunityMembershipsTable.userId, userId),
          eq(CommunityMembershipsTable.communityId, communityId)
        )
      );
  }

  async memberCount(communityId: number): Promise<number> {
    const [memberCount] = await this.dbService.db
      .select({
        count: count(CommunityMembershipsTable.userId),
      })
      .from(CommunityMembershipsTable)
      .where(eq(CommunityMembershipsTable.communityId, communityId));

    return memberCount.count;
  }

  async getMembers(
    { communityId, viewerId }: { communityId: number; viewerId: number },
    args?: ConnectionArgs
  ): Promise<UserConnection> {
    const limit = args?.first ?? 10;
    const after = args?.after
      ? validateAndDecodeGlobalId(args.after, "User")
      : 0;

    const isFriend = sql<boolean>`
      CASE
        WHEN EXISTS (
          SELECT ${viewerId}
          FROM ${UserFriendshipsTable}
          WHERE (
            (${UserFriendshipsTable.userId} = ${viewerId} AND 
            ${UserFriendshipsTable.friendId} = ${CommunityMembershipsTable.userId} AND 
            ${UserFriendshipsTable.status} = 'ACCEPTED')
            OR
            (${UserFriendshipsTable.userId} = ${CommunityMembershipsTable.userId} AND 
            ${UserFriendshipsTable.friendId} = ${viewerId} AND 
            ${UserFriendshipsTable.status} = 'ACCEPTED')
          )
        ) THEN TRUE
        ELSE FALSE
      END 
    `.as("is_friend");

    // show friends at the top of the list
    const memberFriends = await this.dbService.db
      .select({
        ...getTableColumns(CommunityMembershipsTable),
        user: UsersTable,
        isFriend,
      })
      .from(CommunityMembershipsTable)
      .innerJoin(
        UsersTable,
        eq(UsersTable.id, CommunityMembershipsTable.userId)
      )
      .where(eq(CommunityMembershipsTable.communityId, communityId))
      .orderBy(sql`is_friend DESC`, CommunityMembershipsTable.joinedAt)
      .offset(after)
      .limit(limit + 1);

    const nodes = memberFriends
      .slice(0, limit)
      .map((member) => this.userService.pg2GqlMapper(member.user));

    return buildConnection({
      nodes,
      hasNextPage: memberFriends.length > limit,
      hasPreviousPage: !!after,
      createCursor: (node) => node.id,
    });
  }
}
