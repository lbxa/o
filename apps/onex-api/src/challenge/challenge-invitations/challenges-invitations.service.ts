import { Injectable } from "@nestjs/common";
import {
  $DrizzleSchema,
  ChallengeActivitiesTable,
  ChallengeInvitationsTable,
  ChallengesTable,
  CommunitiesTable,
  CommunityMembershipsTable,
  UsersTable,
} from "@o/db";
import { aliasedTable, and, eq } from "drizzle-orm";
import { ForbiddenError, NotFoundError } from "src/utils/errors";

import { ChallengeRepository } from "@/challenge/challenge.repository";
import { DbService } from "@/db/db.service";
import { EntityType, SearchableNumericFields } from "@/entity";
import { EntityService } from "@/entity/entity-service";
import {
  ChallengeInvitation as GqlChallengeInvitation,
  InvitationStatus,
} from "@/types/graphql";
import { UserService } from "@/user/user.service";
import { encodeGlobalId, mapToEnum } from "@/utils";

import { ChallengeService } from "../challenge.service";
import { PgChallengeInvitationComposite } from "./challenge-invitations.types";

@Injectable()
export class ChallengeInvitationsService
  implements
    EntityService<
      typeof ChallengeInvitationsTable,
      PgChallengeInvitationComposite,
      GqlChallengeInvitation,
      PgChallengeInvitationComposite
    >
{
  constructor(
    private challengeService: ChallengeService,
    private challengeRepository: ChallengeRepository,
    private userService: UserService,
    private dbService: DbService<typeof $DrizzleSchema>
  ) {}

  public getTypename(): EntityType {
    return "ChallengeInvitation";
  }

  public pg2GqlMapper(
    invitation: PgChallengeInvitationComposite
  ): GqlChallengeInvitation {
    return {
      ...invitation,
      status: mapToEnum(InvitationStatus, invitation.status),
      challenge: this.challengeService.pg2GqlMapper(invitation.challenge),
      inviter: this.userService.pg2GqlMapper(invitation.inviter),
      invitee: this.userService.pg2GqlMapper(invitation.invitee),
      id: encodeGlobalId("ChallengeInvitation", invitation.id),
    };
  }

  findBy(
    _fields: SearchableNumericFields<
      PgChallengeInvitationComposite,
      "id" | "challengeId" | "inviterId" | "inviteeId"
    >
  ): Promise<GqlChallengeInvitation[]> {
    throw new Error("Method not implemented.");
  }

  async findById(id: number): Promise<GqlChallengeInvitation> {
    const invitation =
      await this.dbService.db.query.ChallengeInvitationsTable.findFirst({
        where: eq(ChallengeInvitationsTable.id, id),
        with: {
          inviter: true,
          invitee: true,
        },
      });

    if (!invitation) {
      throw new NotFoundError(`Challenge invitation with id ${id} not found`);
    }

    const challenge = await this.challengeRepository.findById(
      invitation.challengeId
    );

    if (!challenge) {
      throw new NotFoundError(
        `Challenge with id ${invitation.challengeId} not found`
      );
    }

    return this.pg2GqlMapper({
      ...invitation,
      challenge,
    });
  }

  async findUserInvitationsReceived(
    userId: number
  ): Promise<GqlChallengeInvitation[]> {
    const InviterAlias = aliasedTable(UsersTable, "inviter");
    const InviteeAlias = aliasedTable(UsersTable, "invitee");
    const CommunityOwnerAlias = aliasedTable(UsersTable, "communityOwner");

    const invitations = await this.dbService.db
      .select({
        invitation: ChallengeInvitationsTable,
        challenge: ChallengesTable,
        challengeActivities: ChallengeActivitiesTable,
        inviter: InviterAlias,
        invitee: InviteeAlias,
        community: CommunitiesTable,
        communityOwner: UsersTable,
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
      .innerJoin(
        CommunitiesTable,
        eq(ChallengesTable.communityId, CommunitiesTable.id)
      )
      .innerJoin(
        CommunityOwnerAlias,
        eq(CommunitiesTable.ownerId, CommunityOwnerAlias.id)
      )
      .where(eq(ChallengeInvitationsTable.inviteeId, userId));

    return invitations.map((row) => ({
      ...row.invitation,
      id: encodeGlobalId("ChallengeInvitation", row.invitation.id),
      challenge: this.challengeService.pg2GqlMapper({
        ...row.challenge,
        activities: [
          {
            ...row.challengeActivities,
            challenge: row.challenge,
          },
        ],
        community: {
          ...row.community,
          owner: row.communityOwner,
        },
      }),
      inviter: this.userService.pg2GqlMapper(row.inviter),
      invitee: this.userService.pg2GqlMapper(row.invitee),
      status: mapToEnum(InvitationStatus, row.invitation.status),
    }));
  }

  async invite(
    inviteeId: number,
    inviterId: number,
    challengeId: number
  ): Promise<boolean> {
    if (inviteeId === inviterId) {
      throw new ForbiddenError("Cannot invite self to a challenge");
    }

    const challenge = await this.dbService.db.query.ChallengesTable.findFirst({
      where: eq(ChallengesTable.id, challengeId),
    });

    if (!challenge) {
      throw new NotFoundError(`Challenge with id ${challengeId} not found`);
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
      throw new ForbiddenError(
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
