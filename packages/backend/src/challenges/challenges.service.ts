import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  ChallengeInvitationsTable,
  ChallengeMembershipsTable,
  ChallengesTable,
  CommunityMembershipsTable,
  NewChallenge,
  UsersTable,
} from "@o/db";
import { aliasedTable, and, eq } from "drizzle-orm";

import { DbService } from "../db/db.service";
import {
  Challenge,
  ChallengeInvitation,
  InvitationStatus,
} from "../types/graphql";
import { encodeGlobalId } from "../utils";
import { convertToInvitationStatus } from "../utils/convert-to-invitation-status";

@Injectable()
export class ChallengesService {
  constructor(private dbService: DbService) {}

  async findOne(id: number): Promise<Challenge> {
    const challenge = await this.dbService.db.query.ChallengesTable.findFirst({
      where: eq(ChallengesTable.id, id),
    });

    if (!challenge) {
      throw new NotFoundException(`Challenge with id ${id} not found`);
    }

    const globalId = encodeGlobalId("Challenge", challenge.id);
    return { ...challenge, id: globalId };
  }

  async findAll(): Promise<Challenge[]> {
    const allChallenges =
      await this.dbService.db.query.ChallengesTable.findMany();

    return allChallenges.map((challenge) => ({
      ...challenge,
      id: encodeGlobalId("Challenge", challenge.id),
    }));
  }

  async findUserInvitations(userId: number): Promise<ChallengeInvitation[]> {
    const InviterAlias = aliasedTable(UsersTable, "inviter");
    const InviteeAlias = aliasedTable(UsersTable, "invitee");

    const invitations = await this.dbService.db
      .select({
        invitation: ChallengeInvitationsTable,
        challenge: ChallengesTable,
        inviter: InviterAlias,
        invitee: InviteeAlias,
      })
      .from(ChallengeInvitationsTable)
      .innerJoin(
        ChallengesTable,
        eq(ChallengeInvitationsTable.challengeId, ChallengesTable.id)
      )
      .innerJoin(
        InviterAlias,
        eq(InviterAlias.id, ChallengeInvitationsTable.inviterId)
      )
      .innerJoin(
        InviteeAlias,
        eq(InviteeAlias.id, ChallengeInvitationsTable.inviteeId)
      )
      .where(eq(ChallengeInvitationsTable.inviteeId, userId));

    return invitations.map((row) => ({
      ...row.invitation,
      id: encodeGlobalId("ChallengeInvitation", row.invitation.id),
      challenge: {
        ...row.challenge,
        id: encodeGlobalId("Challenge", row.challenge.id),
      },
      inviter: {
        ...row.inviter,
        id: encodeGlobalId("User", row.inviter.id),
      },
      invitee: {
        ...row.invitee,
        id: encodeGlobalId("User", row.invitee.id),
      },
      status: convertToInvitationStatus(row.invitation.status),
    }));
  }

  async findUserChallenges(userId: number): Promise<Challenge[]> {
    const challenges = await this.dbService.db
      .select({
        id: ChallengesTable.id,
        name: ChallengesTable.name,
        description: ChallengesTable.description,
        startDate: ChallengesTable.startDate,
        endDate: ChallengesTable.endDate,
        createdAt: ChallengesTable.createdAt,
        updatedAt: ChallengesTable.updatedAt,
      })
      .from(ChallengeMembershipsTable)
      .innerJoin(
        ChallengesTable,
        eq(ChallengesTable.id, ChallengeMembershipsTable.challengeId)
      )
      .where(eq(ChallengeMembershipsTable.userId, userId));

    return challenges.map((challenge) => ({
      ...challenge,
      id: encodeGlobalId("Challenge", challenge.id),
    }));
  }

  async findCommunityChallenges(communityId: number): Promise<Challenge[]> {
    const challenges = await this.dbService.db
      .select()
      .from(ChallengesTable)
      .where(eq(ChallengesTable.communityId, communityId));

    return challenges.map((challenge) => ({
      ...challenge,
      id: encodeGlobalId("Challenge", challenge.id),
    }));
  }

  async create(input: NewChallenge, userId: number): Promise<Challenge> {
    // Verify that the user is an admin of the community
    const isAdmin = await this.dbService.db
      .select()
      .from(CommunityMembershipsTable)
      .where(
        and(
          eq(CommunityMembershipsTable.userId, userId),
          eq(CommunityMembershipsTable.communityId, input.communityId),
          eq(CommunityMembershipsTable.isAdmin, true)
        )
      )
      .limit(1);

    if (isAdmin.length === 0) {
      throw new ForbiddenException(
        "Only community admins can create challenges"
      );
    }

    const [result] = await this.dbService.db
      .insert(ChallengesTable)
      .values({ ...input });

    return this.findOne(result.insertId);
  }

  async update(id: number, input: Partial<NewChallenge>): Promise<Challenge> {
    await this.dbService.db
      .update(ChallengesTable)
      .set(input)
      .where(eq(ChallengesTable.id, id));
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<boolean> {
    // Verify that the user is an admin of the community
    const challenge = await this.dbService.db
      .select()
      .from(ChallengesTable)
      .where(eq(ChallengesTable.id, id))
      .limit(1);

    if (!challenge[0]) {
      throw new NotFoundException(`Challenge with id ${id} not found`);
    }

    const isAdmin = await this.dbService.db
      .select()
      .from(CommunityMembershipsTable)
      .where(
        and(
          eq(CommunityMembershipsTable.userId, userId),
          eq(CommunityMembershipsTable.communityId, challenge[0].communityId),
          eq(CommunityMembershipsTable.isAdmin, true)
        )
      )
      .limit(1);

    if (isAdmin.length === 0) {
      throw new ForbiddenException(
        "Only community admins can delete challenges"
      );
    }

    await this.dbService.db
      .delete(ChallengesTable)
      .where(eq(ChallengesTable.id, id));
    return true;
  }

  async invite(
    inviteeId: number,
    inviterId: number,
    challengeId: number
  ): Promise<boolean> {
    if (inviteeId === inviterId) {
      throw new ForbiddenException("Cannot invite self to a challenge");
    }

    const challenge = await this.dbService.db.query.ChallengesTable.findFirst({
      where: eq(ChallengesTable.id, challengeId),
    });

    if (!challenge) {
      throw new NotFoundException(`Challenge with id ${challengeId} not found`);
    }

    // Verify that the inviter is a member of the challenge's community
    const isMember =
      await this.dbService.db.query.CommunityMembershipsTable.findFirst({
        where: and(
          eq(CommunityMembershipsTable.userId, inviterId),
          eq(CommunityMembershipsTable.communityId, challenge.communityId)
        ),
      });

    if (!isMember) {
      throw new ForbiddenException(
        "You must be a member of the community to invite users to this challenge"
      );
    }

    // Insert invitation
    await this.dbService.db.insert(ChallengeInvitationsTable).values({
      challengeId,
      inviterId,
      inviteeId,
      status: InvitationStatus.PENDING,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    });

    return true;
  }

  async join(userId: number, inviteId: number): Promise<Challenge> {
    const invitation =
      await this.dbService.db.query.ChallengeInvitationsTable.findFirst({
        where: and(
          eq(ChallengeInvitationsTable.id, inviteId),
          eq(ChallengeInvitationsTable.inviteeId, userId)
        ),
      });

    if (!invitation) {
      throw new ForbiddenException("Invalid invitation");
    }

    if (invitation.status === InvitationStatus.DECLINED.valueOf()) {
      throw new ForbiddenException("Invitation has been declined");
    }

    if (invitation.expiresAt < new Date()) {
      throw new ForbiddenException("Invitation has expired");
    }

    // Check if the user is a member of the challenge's community
    const challenge = await this.dbService.db.query.ChallengesTable.findFirst({
      where: eq(ChallengesTable.id, invitation.challengeId),
    });

    if (!challenge) {
      throw new NotFoundException(
        `Challenge with id ${invitation.challengeId} not found`
      );
    }

    const isCommunityMember =
      await this.dbService.db.query.CommunityMembershipsTable.findFirst({
        where: and(
          eq(CommunityMembershipsTable.userId, userId),
          eq(CommunityMembershipsTable.communityId, challenge.communityId)
        ),
      });

    if (!isCommunityMember) {
      throw new ForbiddenException(
        "You must be a member of the community to join this challenge"
      );
    }

    // Add user to the challenge
    await this.dbService.db.insert(ChallengeMembershipsTable).values({
      userId,
      communityId: challenge.communityId,
      challengeId: invitation.challengeId,
    });

    // Update invitation status
    await this.dbService.db
      .update(ChallengeInvitationsTable)
      .set({ status: InvitationStatus.ACCEPTED })
      .where(eq(ChallengeInvitationsTable.id, inviteId));

    return this.findOne(invitation.challengeId);
  }

  async leave(userId: number, challengeId: number): Promise<void> {
    await this.dbService.db
      .delete(ChallengeMembershipsTable)
      .where(
        and(
          eq(ChallengeMembershipsTable.userId, userId),
          eq(ChallengeMembershipsTable.challengeId, challengeId)
        )
      );
  }
}
