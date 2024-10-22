import { relations } from "drizzle-orm";
import { pgSchema, text, varchar } from "drizzle-orm/pg-core";

import { withIdPk, withModificationDates } from "../helpers";
import {
  ChallengeInvitationsTable,
  ChallengeMembershipsTable,
} from "./challenge.schema";
import { ChallengeActivityResultsTable } from "./challenge-activity.schema";
import {
  CommunitiesTable,
  CommunityInvitationsTable,
  CommunityMembershipsTable,
} from "./community.schema";

export const UserSchema = pgSchema("user");

export const UsersTable = UserSchema.table("users", {
  ...withIdPk,
  firstName: text().notNull(),
  lastName: text().notNull(),
  fullName: text().notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  handle: varchar({ length: 255 }).unique(),
  password: varchar({ length: 255 }).notNull(),
  refreshToken: varchar({ length: 1000 }),
  avatarUrl: varchar({ length: 1000 }),
  ...withModificationDates,
});

// export const UsersRelations = relations(UsersTable, ({ many }) => ({
//   ownedCommunities: many(CommunitiesTable),
//   communityMemberships: many(CommunityMembershipsTable),
//   communityInvitationsSent: many(CommunityInvitationsTable, {
//     relationName: "inviter",
//   }),
//   communityInvitationsReceived: many(CommunityInvitationsTable, {
//     relationName: "invitee",
//   }),
//   challengeMemberships: many(ChallengeMembershipsTable),
//   challengeInvitationsSent: many(ChallengeInvitationsTable, {
//     relationName: "inviter",
//   }),
//   challengeInvitationsReceived: many(ChallengeInvitationsTable, {
//     relationName: "invitee",
//   }),
//   activityResults: many(ChallengeActivityResultsTable),
// }));

export type User = typeof UsersTable.$inferSelect;
export type NewUser = typeof UsersTable.$inferInsert;
