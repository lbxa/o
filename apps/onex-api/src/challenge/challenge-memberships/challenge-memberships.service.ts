import { Injectable } from "@nestjs/common";
import {
  $DrizzleSchema,
  ChallengeInvitation,
  ChallengeInvitationsTable,
  ChallengeMembershipsTable,
  ChallengesTable,
  CommunityMembershipsTable,
} from "@o/db";
import { and, eq } from "drizzle-orm";

import { DbService } from "@/db/db.service";
import { InvitationStatus } from "@/types/graphql";
import { ForbiddenError, NotFoundError } from "@/utils/errors";

@Injectable()
export class ChallengeMembershipsService {
  constructor(private dbService: DbService<typeof $DrizzleSchema>) {}

  async isMember(userId: number, challengeId: number): Promise<boolean> {
    const membership =
      await this.dbService.db.query.ChallengeMembershipsTable.findFirst({
        where: and(
          eq(ChallengeMembershipsTable.userId, userId),
          eq(ChallengeMembershipsTable.challengeId, challengeId)
        ),
      });

    return !!membership;
  }

  async join(
    userId: number,
    {
      inviteId,
      challengeId = undefined,
    }: { inviteId?: number; challengeId?: number }
  ): Promise<boolean> {
    let invitation: ChallengeInvitation | undefined;

    if (inviteId) {
      invitation =
        await this.dbService.db.query.ChallengeInvitationsTable.findFirst({
          where: and(
            eq(ChallengeInvitationsTable.id, inviteId),
            eq(ChallengeInvitationsTable.inviteeId, userId)
          ),
        });

      if (!invitation) {
        throw new ForbiddenError("Invalid invitation");
      }

      if (invitation.status === InvitationStatus.DECLINED.valueOf()) {
        throw new ForbiddenError("Invitation has been declined");
      }

      if (invitation.expiresAt < new Date()) {
        throw new ForbiddenError("Invitation has expired");
      }
    }

    const selectedChallengeId = challengeId ?? invitation?.challengeId;

    if (!selectedChallengeId) {
      throw new NotFoundError("Challenge ID is required");
    }

    // Check if the user is a member of the challenge's community
    const challenge = await this.dbService.db.query.ChallengesTable.findFirst({
      where: eq(ChallengesTable.id, selectedChallengeId),
    });

    if (!challenge) {
      throw new NotFoundError(
        `Challenge with id ${selectedChallengeId} not found`
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
      throw new ForbiddenError(
        "You must be a member of the community to join this challenge"
      );
    }

    // Add user to the challenge
    await this.dbService.db.insert(ChallengeMembershipsTable).values({
      userId,
      communityId: challenge.communityId,
      challengeId: selectedChallengeId,
    });

    if (invitation) {
      await this.dbService.db
        .update(ChallengeInvitationsTable)
        .set({ status: InvitationStatus.ACCEPTED })
        .where(eq(ChallengeInvitationsTable.id, invitation.id));
    }

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
