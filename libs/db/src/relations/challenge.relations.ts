import { relations } from "drizzle-orm";

import {
  ChallengeActivitiesTable,
  ChallengeActivityResultsTable,
  ChallengeInvitationsTable,
  ChallengeMembershipsTable,
  ChallengesTable,
} from "../schema/challenge.schema";
import { CommunitiesTable } from "../schema/community.schema";
import { UsersTable } from "../schema/user.schema";

export const ChallengesRelations = relations(
  ChallengesTable,
  ({ one, many }) => ({
    community: one(CommunitiesTable, {
      fields: [ChallengesTable.communityId],
      references: [CommunitiesTable.id],
    }),
    owner: one(UsersTable, {
      fields: [ChallengesTable.ownerId],
      references: [UsersTable.id],
    }),
    memberships: many(ChallengeMembershipsTable),
    invitations: many(ChallengeInvitationsTable),
    activities: many(ChallengeActivitiesTable),
    results: many(ChallengeActivityResultsTable),
  })
);

export const ChallengeMembershipsRelations = relations(
  ChallengeMembershipsTable,
  ({ one }) => ({
    user: one(UsersTable, {
      fields: [ChallengeMembershipsTable.userId],
      references: [UsersTable.id],
    }),
    community: one(CommunitiesTable, {
      fields: [ChallengeMembershipsTable.communityId],
      references: [CommunitiesTable.id],
    }),
    challenge: one(ChallengesTable, {
      fields: [ChallengeMembershipsTable.challengeId],
      references: [ChallengesTable.id],
    }),
  })
);

export const ChallengeInvitationsRelations = relations(
  ChallengeInvitationsTable,
  ({ one }) => ({
    challenge: one(ChallengesTable, {
      fields: [ChallengeInvitationsTable.challengeId],
      references: [ChallengesTable.id],
    }),
    inviter: one(UsersTable, {
      fields: [ChallengeInvitationsTable.inviterId],
      references: [UsersTable.id],
      relationName: "challengeInviter",
    }),
    invitee: one(UsersTable, {
      fields: [ChallengeInvitationsTable.inviteeId],
      references: [UsersTable.id],
      relationName: "challengeInvitee",
    }),
  })
);

export const ChallengeActivitiesRelations = relations(
  ChallengeActivitiesTable,
  ({ one, many }) => ({
    challenge: one(ChallengesTable, {
      fields: [ChallengeActivitiesTable.challengeId],
      references: [ChallengesTable.id],
    }),
    results: many(ChallengeActivityResultsTable),
  })
);

export const ChallengeActivityResultRelations = relations(
  ChallengeActivityResultsTable,
  ({ one }) => ({
    user: one(UsersTable, {
      fields: [ChallengeActivityResultsTable.userId],
      references: [UsersTable.id],
    }),
    activity: one(ChallengeActivitiesTable, {
      fields: [ChallengeActivityResultsTable.activityId],
      references: [ChallengeActivitiesTable.id],
    }),
    challenge: one(ChallengesTable, {
      fields: [ChallengeActivityResultsTable.challengeId],
      references: [ChallengesTable.id],
    }),
  })
);
