import { relations } from "drizzle-orm";

import {
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
import { UserFriendshipsTable, UsersTable } from "../schema/user.schema";

export const UsersRelations = relations(UsersTable, ({ many }) => ({
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
  friendships: many(UserFriendshipsTable),
}));

export const UserFriendshipsRelations = relations(
  UserFriendshipsTable,
  ({ one }) => ({
    user: one(UsersTable, {
      fields: [UserFriendshipsTable.userId],
      references: [UsersTable.id],
    }),
    friend: one(UsersTable, {
      fields: [UserFriendshipsTable.friendId],
      references: [UsersTable.id],
    }),
  })
);
