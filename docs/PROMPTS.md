# Useful Prompts

```plaintext
I'm building a startup focused on building social fitness experiences.

Tech stack: react native, react relay, graphql, nestjs, drizzle, mysql.
...
```

```plaintext
I'm building a startup focused on building social fitness experiences.

Tech stack: react native, react relay, graphql, nestjs, drizzle, mysql.

My backend is structued as such:

DomainEntity has a Module which contains a gql resolver and services for handling business logic.

We have communities which can host challenges. Users can be invited to challenges, they can join them etc. etc. you get the point. I want the backend to scale logarihtmically with complexity i.e. adding more code to the backend should not make it harder to maintain - in fact the opposite should occur, our patterns become more obvious and ingrained.

Current this is a service I implemented:

import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import {
  Challenge as PgChallenge,
  ChallengeInvitationsTable,
  ChallengeMembershipsTable,
  ChallengesTable,
  CommunitiesTable,
  CommunityMembershipsTable,
  NewChallenge,
  NewChallengeActivity,
  UsersTable,
} from "@o/db";
import * as schema from "@o/db";
import { aliasedTable, and, eq } from "drizzle-orm";

import { DbService } from "../db/db.service";
import { EntityMapper } from "../entity/entity-mapper";
import {
  Challenge as GqlChallenge,
  ChallengeCadence,
  ChallengeInvitation,
  ChallengeMode,
  InvitationStatus,
} from "../types/graphql";
import { encodeGlobalId, mapToEnum } from "../utils";
import { ChallengeActivitiesService } from "./challenge-activity";

@Injectable()
export class ChallengesService
  implements EntityMapper<typeof ChallengesTable, PgChallenge, GqlChallenge>
{
  constructor(
    private challengeActivitiesService: ChallengeActivitiesService,
    private dbService: DbService<typeof schema>
  ) {}

  // TODO map Db types to GraphQL types
  // e.g. DrizzleChallenge -> Challenge
  // add mapper to interface for all services to implement
  public pg2GqlMapper(challenge: PgChallenge): GqlChallenge {
    return {
      ...challenge,
      mode: mapToEnum(ChallengeMode, challenge.mode),
      cadence: mapToEnum(ChallengeCadence, challenge.cadence),
      id: encodeGlobalId("Challenge", challenge.id),
    };
  }

  async findOne(id: number): Promise<GqlChallenge> {
    const challenge = await this.dbService.db.query.ChallengesTable.findFirst({
      where: eq(ChallengesTable.id, id),
      with: {
        community: true,
      },
    });

    if (!challenge) {
      throw new NotFoundException(`Challenge with id ${id} not found`);
    }

    return {
      ...this.pg2GqlMapper(challenge),
      community: {
        ...challenge.community,
        id: encodeGlobalId("Community", challenge.community.id),
      },
    };
  }

  async findAll(): Promise<GqlChallenge[]> {
    const allChallenges =
      await this.dbService.db.query.ChallengesTable.findMany({
        with: { community: true },
      });

    return allChallenges.map((challenge) => ({
      ...this.pg2GqlMapper(challenge),
      community: {
        ...challenge.community,
        id: encodeGlobalId("Community", challenge.community.id),
      },
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
        community: CommunitiesTable,
      })
      .from(ChallengeInvitationsTable)
      .innerJoin(
        ChallengesTable,
        eq(ChallengeInvitationsTable.challengeId, ChallengesTable.id)
      )
      .innerJoin(
        CommunitiesTable,
        eq(ChallengesTable.communityId, CommunitiesTable.id)
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
        ...this.pg2GqlMapper(row.challenge),
        community: {
          ...row.community,
          id: encodeGlobalId("Community", row.community.id),
        },
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

  async findUserChallenges(userId: number): Promise<GqlChallenge[]> {
    const challenges = await this.dbService.db
      .select({
        challenge: ChallengesTable,
        community: CommunitiesTable,
      })
      .from(ChallengeMembershipsTable)
      .innerJoin(
        ChallengesTable,
        eq(ChallengesTable.id, ChallengeMembershipsTable.challengeId)
      )
      .innerJoin(
        CommunitiesTable,
        eq(CommunitiesTable.id, ChallengeMembershipsTable.communityId)
      )
      .where(eq(ChallengeMembershipsTable.userId, userId));

    return challenges.map((challenge) => ({
      ...this.pg2GqlMapper(challenge.challenge),
      community: {
        ...challenge.community,
        id: encodeGlobalId("Community", challenge.community.id),
      },
    }));
  }

  async findCommunityChallenges(communityId: number): Promise<GqlChallenge[]> {
    const challenges = await this.dbService.db.query.ChallengesTable.findMany({
      where: eq(ChallengesTable.communityId, communityId),
    });

    return challenges.map((challenge) => ({
      ...challenge,
      mode: mapToEnum(ChallengeMode, challenge.mode),
      cadence: mapToEnum(ChallengeCadence, challenge.cadence),
      id: encodeGlobalId("Challenge", challenge.id),
    }));
  }

  async create(
    challengeInput: NewChallenge,
    activityInput: Omit<NewChallengeActivity, "challengeId">,
    userId: number
  ): Promise<GqlChallenge> {
    const isAdmin =
      await this.dbService.db.query.CommunityMembershipsTable.findFirst({
        where: and(
          eq(CommunityMembershipsTable.userId, userId),
          eq(CommunityMembershipsTable.communityId, challengeInput.communityId),
          eq(CommunityMembershipsTable.isAdmin, true)
        ),
      });

    if (!isAdmin) {
      throw new ForbiddenException(
        "Only community admins can create challenges"
      );
    }

    const [challenge] = await this.dbService.db
      .insert(ChallengesTable)
      .values({ ...challengeInput })
      .returning();

    const challengeActivity = await this.challengeActivitiesService.create({
      ...activityInput,
      challengeId: challenge.id,
    });

    if (!challengeActivity) {
      throw new InternalServerErrorException(
        "Failed to create challenge activity"
      );
    }

    return this.pg2GqlMapper(challenge);
  }

  async update(
    id: number,
    input: Partial<NewChallenge>
  ): Promise<GqlChallenge> {
    const [updatedChallenge] = await this.dbService.db
      .update(ChallengesTable)
      .set(input)
      .where(eq(ChallengesTable.id, id))
      .returning();

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!updatedChallenge) {
      throw new NotFoundException(`Challenge with id ${id} not found`);
    }

    return this.pg2GqlMapper(updatedChallenge);
  }

  async remove(id: number, userId: number): Promise<boolean> {
    // Verify that the user is an admin of the community
    const challenge = await this.dbService.db.query.ChallengesTable.findFirst({
      where: eq(ChallengesTable.id, id),
    });

    if (!challenge) {
      throw new NotFoundException(`Challenge with id ${id} not found`);
    }

    const isAdmin =
      await this.dbService.db.query.CommunityMembershipsTable.findFirst({
        where: and(
          eq(CommunityMembershipsTable.userId, userId),
          eq(CommunityMembershipsTable.communityId, challenge.communityId),
          eq(CommunityMembershipsTable.isAdmin, true)
        ),
      });

    if (isAdmin) {
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

  async join(userId: number, inviteId: number): Promise<GqlChallenge> {
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

Ive written an implementation:

export interface EntityMapper<
  T extends AnyPgTable,
  PgType extends T["$inferSelect"],
  GqlType extends Node,
> {
  pg2GqlMapper(pgEntity: PgType): GqlType;
}

To ensure we have a bridge between postgres and graphql worlds. However I've noticed that some graphql entites required nested objects i.e.

type Challenge implements Node & Timestamps {
  id: ID!
  name: String!
  description: String
  community: Community
  startDate: DateTime
  endDate: DateTime
  mode: ChallengeMode
  cadence: ChallengeCadence
  createdAt: DateTime
  updatedAt: DateTime
  # TODO the future challenges will support multiple activities
  activity: ChallengeActivity

  members: [User!]
  memberships: [ChallengeMembership!]
  invitations: [ChallengeInvitation!]
}

Hence I wrote this

export interface AsyncEntityMapper<
  T extends AnyPgTable,
  PgType extends T["$inferSelect"],
  GqlType extends Node,
> {
  pg2GqlMapperAsync(pgEntity: PgType): Promise<GqlType>;
}

however, the pg2GqlMapperAsync function is instead to be run for on long loops. if each call of asyncMapper results in a db fetch then this will not be great for performance as volumes increase.

IS there a better way?
```
