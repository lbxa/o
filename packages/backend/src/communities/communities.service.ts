import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  CommunitiesTable,
  Community as PgCommunity,
  CommunityInvitationsTable,
  CommunityMembershipsTable,
  NewCommunity,
  UsersTable,
} from "@o/db";
import { aliasedTable, and, eq } from "drizzle-orm";

import { DbService } from "../db/db.service";
import { EntityService } from "../entity/entity-service";
import {
  Community as GqlCommunity,
  CommunityInvitation,
  InvitationStatus,
} from "../types/graphql";
import { encodeGlobalId } from "../utils";
import { mapToEnum } from "../utils/map-to-enum";

@Injectable()
export class CommunitiesService
  implements EntityService<typeof CommunitiesTable, PgCommunity, GqlCommunity>
{
  constructor(private dbService: DbService) {}

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
      .innerJoin(
        CommunitiesTable,
        eq(CommunityInvitationsTable.communityId, CommunitiesTable.id)
      )
      .innerJoin(
        InviterAlias,
        eq(InviterAlias.id, CommunityInvitationsTable.inviterId)
      )
      .innerJoin(
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
      status: mapToEnum(InvitationStatus, row.invitation.status),
    }));
  }

  async findUserCommunities(userId: number): Promise<GqlCommunity[]> {
    const communities = await this.dbService.db
      .select({
        userCommunity: CommunitiesTable,
      })
      .from(CommunityMembershipsTable)
      .innerJoin(
        CommunitiesTable,
        eq(CommunitiesTable.id, CommunityMembershipsTable.communityId)
      )
      .where(eq(CommunityMembershipsTable.userId, userId));

    return communities.map((community) =>
      this.pg2GqlMapper(community.userCommunity)
    );
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
      })
      .returning({ insertedId: CommunityInvitationsTable.id });

    const invitation = await this.dbService.db
      .select()
      .from(CommunityInvitationsTable)
      .where(eq(CommunityInvitationsTable.id, result.insertedId))
      .limit(1);

    if (!invitation[0]) {
      throw new NotFoundException(
        `Invitation with ID ${result.insertedId} not found`
      );
    }

    return true;
  }

  async join(
    userId: number,
    inviteId: number
  ): Promise<GqlCommunity | undefined> {
    const invitations = await this.dbService.db
      .select()
      .from(CommunityInvitationsTable)
      .where(
        and(
          eq(CommunityInvitationsTable.id, inviteId),
          eq(CommunityInvitationsTable.inviteeId, userId)
        )
      )
      .limit(1);

    if (!invitations[0] || invitations[0].inviteeId !== userId) {
      throw new ForbiddenException("Invalid invitation");
    }

    const invitation = invitations[0];

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

    return this.findById(invitation.communityId);
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
