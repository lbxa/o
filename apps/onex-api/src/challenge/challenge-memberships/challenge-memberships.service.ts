/* eslint-disable @stylistic/js/max-len */
import { Injectable } from "@nestjs/common";
import {
  $DrizzleSchema,
  ChallengeInvitation,
  ChallengeInvitationsTable,
  ChallengeMembershipsTable,
  ChallengesTable,
  CommunityMembershipsTable,
  UserFriendshipsTable,
  UsersTable,
} from "@o/db";
import { and, eq, getTableColumns, sql } from "drizzle-orm";

import { DbService } from "@/db/db.service";
import { InvitationStatus, UserConnection } from "@/types/graphql";
import { UserService } from "@/user/user.service";
import {
  buildConnection,
  ConnectionArgs,
  validateAndDecodeGlobalId,
} from "@/utils";
import { ForbiddenError, NotFoundError } from "@/utils/errors";

@Injectable()
export class ChallengeMembershipsService {
  constructor(
    private userService: UserService,
    private dbService: DbService<typeof $DrizzleSchema>
  ) {}

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

  async getMembers(
    { challengeId, viewerId }: { challengeId: number; viewerId: number },
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
            ${UserFriendshipsTable.friendId} = ${ChallengeMembershipsTable.userId} AND 
            ${UserFriendshipsTable.status} = 'ACCEPTED')
            OR
            (${UserFriendshipsTable.userId} = ${ChallengeMembershipsTable.userId} AND 
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
        ...getTableColumns(ChallengeMembershipsTable),
        user: UsersTable,
        isFriend,
      })
      .from(ChallengeMembershipsTable)
      .innerJoin(
        UsersTable,
        eq(UsersTable.id, ChallengeMembershipsTable.userId)
      )
      .where(eq(ChallengeMembershipsTable.challengeId, challengeId))
      .orderBy(sql`is_friend DESC`, ChallengeMembershipsTable.joinedAt)
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
