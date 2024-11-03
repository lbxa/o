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
} from "@o/db";
import { and, eq } from "drizzle-orm";

import { DbService } from "../../db/db.service";
import { InvitationStatus } from "../../types/graphql";

@Injectable()
export class ChallengeMembershipsService {
  constructor(private dbService: DbService) {}

  async join(userId: number, inviteId: number): Promise<boolean> {
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

    await this.dbService.db
      .update(ChallengeInvitationsTable)
      .set({ status: InvitationStatus.ACCEPTED })
      .where(eq(ChallengeInvitationsTable.id, inviteId));

    return true;
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
