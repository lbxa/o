import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  Challenge as PgChallenge,
  ChallengeActivitiesTable,
  ChallengeActivity as PgChallengeActivity,
  ChallengeInvitation as PgChallengeInvitation,
  ChallengeInvitationsTable,
  ChallengesTable,
  CommunityMembershipsTable,
  User as PgUser,
  UsersTable,
} from "@o/db";
import { aliasedTable, and, eq } from "drizzle-orm";

import { DbService } from "../../db/db.service";
import { EntityMapper } from "../../entity/entity-mapper";
import {
  ChallengeInvitation as GqlChallengeInvitation,
  InvitationStatus,
} from "../../types/graphql";
import { UsersService } from "../../users/users.service";
import { encodeGlobalId, mapToEnum } from "../../utils";
import { ChallengesService } from "../challenges.service";

@Injectable()
export class ChallengeInvitationsService
  implements
    EntityMapper<
      typeof ChallengeInvitationsTable,
      PgChallengeInvitation,
      GqlChallengeInvitation
    >
{
  constructor(
    private challengesService: ChallengesService,
    private usersService: UsersService,
    private dbService: DbService
  ) {}

  public pg2GqlMapper(
    invitation: PgChallengeInvitation & {
      challenge: PgChallenge & {
        activities: PgChallengeActivity[];
      };
      inviter: PgUser;
      invitee: PgUser;
    }
  ): GqlChallengeInvitation {
    return {
      ...invitation,
      status: mapToEnum(InvitationStatus, invitation.status),
      challenge: this.challengesService.pg2GqlMapper(invitation.challenge),
      inviter: this.usersService.pg2GqlMapper(invitation.inviter),
      invitee: this.usersService.pg2GqlMapper(invitation.invitee),
      id: encodeGlobalId("ChallengeInvitation", invitation.id),
    };
  }

  async findUserInvitationsReceived(
    userId: number
  ): Promise<GqlChallengeInvitation[]> {
    const InviterAlias = aliasedTable(UsersTable, "inviter");
    const InviteeAlias = aliasedTable(UsersTable, "invitee");

    const invitations = await this.dbService.db
      .select({
        invitation: ChallengeInvitationsTable,
        challenge: ChallengesTable,
        challengeActivities: ChallengeActivitiesTable,
        inviter: InviterAlias,
        invitee: InviteeAlias,
      })
      .from(ChallengeInvitationsTable)
      .innerJoin(
        ChallengesTable,
        eq(ChallengeInvitationsTable.challengeId, ChallengesTable.id)
      )
      .innerJoin(
        ChallengeActivitiesTable,
        eq(ChallengesTable.id, ChallengeActivitiesTable.challengeId)
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
      challenge: this.challengesService.pg2GqlMapper({
        ...row.challenge,
        activities: [row.challengeActivities],
      }),
      inviter: this.usersService.pg2GqlMapper(row.inviter),
      invitee: this.usersService.pg2GqlMapper(row.invitee),
      status: mapToEnum(InvitationStatus, row.invitation.status),
    }));
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

    await this.dbService.db.insert(ChallengeInvitationsTable).values({
      challengeId,
      inviterId,
      inviteeId,
      status: InvitationStatus.PENDING,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    });

    return true;
  }
}
