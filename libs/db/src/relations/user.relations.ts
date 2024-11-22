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
import { UsersTable } from "../schema/user.schema";

export const UsersRelations = relations(UsersTable, ({ many }) => ({
  ownedCommunities: many(CommunitiesTable),
  communityMemberships: many(CommunityMembershipsTable),
  communityInvitationsSent: many(CommunityInvitationsTable, {
    relationName: "inviter",
  }),
  communityInvitationsReceived: many(CommunityInvitationsTable, {
    relationName: "invitee",
  }),
  challengesOwned: many(ChallengesTable),
  challengeMemberships: many(ChallengeMembershipsTable),
  challengeInvitationsSent: many(ChallengeInvitationsTable, {
    relationName: "inviter",
  }),
  challengeInvitationsReceived: many(ChallengeInvitationsTable, {
    relationName: "invitee",
  }),
  activityResults: many(ChallengeActivityResultsTable),
}));
