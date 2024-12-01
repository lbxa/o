import { Injectable } from "@nestjs/common";
import {
  CommunitiesTable,
  CommunityInvitationsTable,
  CommunityMembershipsTable,
} from "@o/db";
import * as schema from "@o/db";
import { and, eq, getTableColumns } from "drizzle-orm";

import { DbService } from "../../db/db.service";
import { CommunityJoinPayload, InvitationStatus } from "../../types/graphql";
import { encodeGlobalId } from "../../utils";
import { ForbiddenError, InternalServerError } from "../../utils/errors";
import { CommunityService } from "../community.service";

@Injectable()
export class CommunityMembershipsService {
  constructor(
    private dbService: DbService<typeof schema>,
    private communityService: CommunityService
  ) {}

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
        node: this.communityService.pg2GqlMapper(invitation.community),
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
}
