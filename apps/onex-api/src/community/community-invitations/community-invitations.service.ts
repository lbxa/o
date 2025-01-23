import { Injectable } from "@nestjs/common";
import {
  $DrizzleSchema,
  CommunitiesTable,
  CommunityInvitation as PgCommunityInvitation,
  CommunityInvitationsTable,
  User as PgUser,
  UsersTable,
} from "@o/db";
import { aliasedTable, and, desc, eq } from "drizzle-orm";

import {
  CommunityRepository,
  PgCommunityComposite,
} from "@/community/community.repository";
import { DbService } from "@/db/db.service";
import { EntityType } from "@/entity";
import { EntityService } from "@/entity/entity-service";
import {
  CommunityInvitation as GqlCommunityInvitation,
  CommunityInvitationConnection,
  CommunityInviteDeclinePayload,
  InvitationStatus,
} from "@/types/graphql";
import { UserService } from "@/user/user.service";
import { encodeGlobalId, mapToEnum, validateAndDecodeGlobalId } from "@/utils";
import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from "@/utils/errors";

import { CommunityService } from "../community.service";

type PgCommunityInvitationComposite = PgCommunityInvitation & {
  community: PgCommunityComposite;
  inviter: PgUser;
  invitee: PgUser;
};

@Injectable()
export class CommunityInvitationsService
  implements
    EntityService<
      typeof CommunityInvitationsTable,
      PgCommunityInvitation,
      GqlCommunityInvitation
    >
{
  constructor(
    private communityService: CommunityService,
    private communityRepository: CommunityRepository,
    private userService: UserService,
    private dbService: DbService<typeof $DrizzleSchema>
  ) {}

  public getTypename(): EntityType {
    return "CommunityInvitation";
  }

  public pg2GqlMapper(
    invitation: PgCommunityInvitationComposite
  ): GqlCommunityInvitation {
    return {
      ...invitation,
      status: mapToEnum(InvitationStatus, invitation.status),
      community: this.communityService.pg2GqlMapper(invitation.community),
      inviter: this.userService.pg2GqlMapper(invitation.inviter),
      invitee: this.userService.pg2GqlMapper(invitation.invitee),
      id: encodeGlobalId("CommunityInvitation", invitation.id),
    };
  }

  async findById(id: number): Promise<GqlCommunityInvitation> {
    const invitation =
      await this.dbService.db.query.CommunityInvitationsTable.findFirst({
        where: eq(CommunityInvitationsTable.id, id),
        with: {
          inviter: true,
          invitee: true,
        },
      });

    if (!invitation) {
      throw new NotFoundError(`Community invitation with id ${id} not found`);
    }

    const community = await this.communityRepository.findById(
      invitation.communityId
    );

    if (!community) {
      throw new NotFoundError(
        `Community with id ${invitation.communityId} not found`
      );
    }

    return this.pg2GqlMapper({ ...invitation, community });
  }

  /**
   * This mess is a result from the relations API being broken
   * @returns PgSelect
   */

  async findUserInvitationsReceived({
    userId,
    first,
    after,
    forCommunityId,
  }: {
    userId: number;
    first: number;
    after?: string;
    forCommunityId?: number;
  }): Promise<CommunityInvitationConnection> {
    const startCursorId = after
      ? validateAndDecodeGlobalId(after, "CommunityInvitation")
      : 0;

    const InviterAlias = aliasedTable(UsersTable, "inviter");
    const InviteeAlias = aliasedTable(UsersTable, "invitee");
    const CommunityOwnerAlias = aliasedTable(UsersTable, "communityOwner");

    const invitationsQuery = this.dbService.db
      .select({
        invitation: CommunityInvitationsTable,
        community: CommunitiesTable,
        communityOwner: CommunityOwnerAlias,
        inviter: InviterAlias,
        invitee: InviteeAlias,
      })
      .from(CommunityInvitationsTable)
      .innerJoin(
        CommunitiesTable,
        eq(CommunityInvitationsTable.communityId, CommunitiesTable.id)
      )
      .innerJoin(
        CommunityOwnerAlias,
        eq(CommunitiesTable.ownerId, CommunityOwnerAlias.id)
      )
      .innerJoin(
        InviterAlias,
        eq(InviterAlias.id, CommunityInvitationsTable.inviterId)
      )
      .innerJoin(
        InviteeAlias,
        eq(InviteeAlias.id, CommunityInvitationsTable.inviteeId)
      )
      .where(
        and(
          eq(CommunityInvitationsTable.inviteeId, userId),
          eq(CommunityInvitationsTable.status, InvitationStatus.PENDING),
          forCommunityId ? eq(CommunitiesTable.id, forCommunityId) : undefined
        )
      )
      .orderBy(desc(CommunityInvitationsTable.createdAt))
      .offset(startCursorId)
      .limit(first + 1);

    const invitations = await invitationsQuery;

    const edges = invitations.slice(0, first).map((row) => ({
      node: this.pg2GqlMapper({
        ...row.invitation,
        community: {
          ...row.community,
          owner: row.communityOwner,
        },
        inviter: row.inviter,
        invitee: row.invitee,
      }),
      cursor: encodeGlobalId("CommunityInvitation", row.invitation.id),
    }));

    return {
      edges,
      pageInfo: {
        startCursor: edges.length > 0 ? edges[0].cursor : null,
        endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
        hasNextPage: invitations.length > first,
        hasPreviousPage: startCursorId > 0,
      },
    };
  }

  async invite({
    inviteeId,
    inviterId,
    communityId,
  }: {
    inviteeId: number;
    inviterId: number;
    communityId: number;
  }): Promise<boolean> {
    if (inviteeId === inviterId) {
      throw new ForbiddenError("Cannot invite self to a community");
    }

    const [result] = await this.dbService.db
      .insert(CommunityInvitationsTable)
      .values({
        communityId,
        inviterId,
        inviteeId: inviteeId,
        status: InvitationStatus.PENDING,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      })
      .returning({ insertedId: CommunityInvitationsTable.id });

    const invitation =
      await this.dbService.db.query.CommunityInvitationsTable.findFirst({
        where: eq(CommunityInvitationsTable.id, result.insertedId),
      });

    if (!invitation) {
      throw new NotFoundError(
        `Invitation with ID ${result.insertedId} not found`
      );
    }

    return true;
  }

  async declineInvitation(
    userId: number,
    inviteId: number
  ): Promise<CommunityInviteDeclinePayload> {
    const invitation =
      await this.dbService.db.query.CommunityInvitationsTable.findFirst({
        where: and(
          eq(CommunityInvitationsTable.id, inviteId),
          eq(CommunityInvitationsTable.inviteeId, userId)
        ),
      });

    if (!invitation) {
      throw new ForbiddenError("Invalid invitation");
    }

    if (invitation.status !== InvitationStatus.PENDING.valueOf()) {
      throw new ForbiddenError("Invitation is not pending");
    }

    const [updatedInvitation] = await this.dbService.db
      .update(CommunityInvitationsTable)
      .set({ status: InvitationStatus.DECLINED })
      .where(eq(CommunityInvitationsTable.id, inviteId))
      .returning();

    if (!updatedInvitation) {
      throw new InternalServerError("Failed to update invitation record");
    }

    return {
      invitationId: encodeGlobalId("CommunityInvitation", inviteId),
    };
  }
}
