import { relations } from "drizzle-orm";

import {
  ChallengeActivitiesTable,
  ChallengeActivityResultsTable,
  ChallengeInvitationsTable,
  ChallengeMembershipsTable,
  ChallengesTable,
} from "../schema/challenge.schema";
import {
  CommunitiesTable,
  CommunityInvitationsTable,
  CommunityMembershipsTable,
} from "../schema/community.schema";
import {
  UserFriendshipsTable,
  UserRecordsTable,
  UsersTable,
  UserStreaksTable,
} from "../schema/user.schema";

export const UsersRelations = relations(UsersTable, ({ many, one }) => ({
  ownedCommunities: many(CommunitiesTable),
  communityMemberships: many(CommunityMembershipsTable),
  communityInvitationsSent: many(CommunityInvitationsTable, {
    relationName: "communityInviter",
  }),
  communityInvitationsReceived: many(CommunityInvitationsTable, {
    relationName: "communityInvitee",
  }),
  challengesOwned: many(ChallengesTable),
  challengeMemberships: many(ChallengeMembershipsTable),
  challengeInvitationsSent: many(ChallengeInvitationsTable, {
    relationName: "challengeInviter",
  }),
  challengeInvitationsReceived: many(ChallengeInvitationsTable, {
    relationName: "challengeInvitee",
  }),
  activityResults: many(ChallengeActivityResultsTable),
  following: many(UserFriendshipsTable, {
    relationName: "user",
  }),
  followers: many(UserFriendshipsTable, {
    relationName: "friend",
  }),
  streak: one(UserStreaksTable, {
    fields: [UsersTable.id],
    references: [UserStreaksTable.userId],
  }),
  records: many(UserRecordsTable),
}));

export const UserFriendshipsRelations = relations(
  UserFriendshipsTable,
  ({ one }) => ({
    // TODO might need a better name for these
    user: one(UsersTable, {
      fields: [UserFriendshipsTable.userId],
      references: [UsersTable.id],
      relationName: "user",
    }),
    friend: one(UsersTable, {
      fields: [UserFriendshipsTable.friendId],
      references: [UsersTable.id],
      relationName: "friend",
    }),
  })
);

export const UserStreaksRelations = relations(UserStreaksTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [UserStreaksTable.userId],
    references: [UsersTable.id],
  }),
}));

export const UserRecordsRelations = relations(UserRecordsTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [UserRecordsTable.userId],
    references: [UsersTable.id],
  }),
  challenge: one(ChallengesTable, {
    fields: [UserRecordsTable.challengeId],
    references: [ChallengesTable.id],
  }),
  activity: one(ChallengeActivitiesTable, {
    fields: [UserRecordsTable.activityId],
    references: [ChallengeActivitiesTable.id],
  }),
  activityResult: one(ChallengeActivityResultsTable, {
    fields: [UserRecordsTable.activityResultId],
    references: [ChallengeActivityResultsTable.id],
  }),
}));
