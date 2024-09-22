import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  CommunitiesTable,
  CommunityInvitationsTable,
  CommunityMembershipsTable,
  NewCommunity,
  UsersTable,
} from "@o/db";
import { aliasedTable, and, eq } from "drizzle-orm";

import { DbService } from "../db/db.service";
import {
  Community,
  CommunityInvitation,
  InvitationStatus,
} from "../types/graphql";
import { UsersService } from "../users/users.service";
import { encodeGlobalId } from "../utils";

@Injectable()
export class CommunitiesService {
  constructor(
    private usersService: UsersService,
    private dbService: DbService
  ) {}

  async findOne(id: number): Promise<Community> {
    const [community] = await this.dbService.db
      .select()
      .from(CommunitiesTable)
      .where(eq(CommunitiesTable.id, id));

    if (!community) {
      throw new NotFoundException(`Community with id ${id} not found`);
    }

    const globalId = encodeGlobalId("Community", community.id);
    return { ...community, id: globalId };
  }

  async findAll(): Promise<Community[]> {
    const allCommunities = await this.dbService.db
      .select()
      .from(CommunitiesTable);

    return allCommunities.map((community) => ({
      ...community,
      id: encodeGlobalId("Community", community.id),
    }));
  }

  async findUserInvitations(userId: number): Promise<CommunityInvitation[]> {
    const InviterAlias = aliasedTable(UsersTable, "inviter");
    const InviteeAlias = aliasedTable(UsersTable, "invitee");

    const invitations = await this.dbService.db
      .select({
        invitation: CommunityInvitationsTable,
        community: CommunitiesTable,
        inviter: InviterAlias,
        invitee: InviteeAlias,
      })
      .from(CommunityInvitationsTable)
      .leftJoin(
        CommunitiesTable,
        eq(CommunityInvitationsTable.communityId, CommunitiesTable.id)
      )
      .leftJoin(
        InviterAlias,
        eq(InviterAlias.id, CommunityInvitationsTable.inviterId)
      )
      .leftJoin(
        InviteeAlias,
        eq(InviteeAlias.id, CommunityInvitationsTable.inviteeId)
      )
      .where(eq(CommunityInvitationsTable.inviteeId, userId));

    return invitations.map((row) => ({
      ...row.invitation,
      id: encodeGlobalId("CommunityInvitation", row.invitation.id),
      community: {
        ...row.community,
        id: encodeGlobalId("Community", row.community.id),
      },
      inviter: {
        ...row.inviter,
        id: encodeGlobalId("User", row.inviter.id),
      },
      invitee: {
        ...row.invitee,
        id: encodeGlobalId("User", row.invitee.id),
      },
    }));
  }

  async create(input: NewCommunity, userId: number): Promise<Community> {
    const [result] = await this.dbService.db
      .insert(CommunitiesTable)
      .values({ ...input, ownerId: userId });

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
    await this.dbService.db
      .delete(CommunitiesTable)
      .where(eq(CommunitiesTable.id, id));
    return community;
  }

  async invite(
    inviteeId: number,
    inviterId: number,
    communityId: number
  ): Promise<boolean> {
    if (inviteeId === inviterId) {
      throw new ForbiddenException("Cannot invite self to a community");
    }

    const [result] = await this.dbService.db
      .insert(CommunityInvitationsTable)
      .values({
        communityId,
        inviterId,
        inviteeId: inviteeId,
        status: InvitationStatus.PENDING,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      });

    const [invitation] = await this.dbService.db
      .select()
      .from(CommunityInvitationsTable)
      .where(eq(CommunityInvitationsTable.id, result.insertId));

    if (!invitation) {
      throw new NotFoundException(
        `Invitation with ID ${result.insertId} not found`
      );
    }

    return true;
  }

  async join(userId: number, inviteId: number): Promise<Community> {
    const [invitation] = await this.dbService.db
      .select()
      .from(CommunityInvitationsTable)
      .where(
        and(
          eq(CommunityInvitationsTable.id, inviteId),
          eq(CommunityInvitationsTable.inviteeId, userId)
        )
      );

    if (!invitation || invitation.inviteeId !== userId) {
      throw new ForbiddenException("Invalid invitation");
    }

    // TODO is this good design?
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
        throw new ForbiddenException("Invitation has been declined");
      case InvitationStatus.ACCEPTED.valueOf():
      case InvitationStatus.PENDING.valueOf():
        // users can re-join communities the have already been invited to
        // does this mean the expiry is ignored for the invite
        break;
      default:
    }

    if (invitation.expiresAt < new Date()) {
      throw new ForbiddenException("Invitation has expired");
    }

    await this.dbService.db
      .insert(CommunityMembershipsTable)
      .values({ userId, communityId: invitation.communityId });

    await this.dbService.db
      .update(CommunityInvitationsTable)
      .set({ status: InvitationStatus.ACCEPTED })
      .where(eq(CommunityInvitationsTable.id, inviteId));

    return this.findOne(invitation.communityId);
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
