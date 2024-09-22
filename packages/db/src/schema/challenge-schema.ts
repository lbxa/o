import {
  boolean,
  index,
  int,
  mysqlTable,
  timestamp,
  varchar,
  text,
} from "drizzle-orm/mysql-core";
import { UsersTable } from "./user-schema";
import { CommunitiesTable } from "./community-schema";
import { withIdPk, withModificationDates } from "../helpers";

export const ChallengesTable = mysqlTable("challenges", {
  ...withIdPk,
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  communityId: int("community_id")
    .notNull()
    .references(() => CommunitiesTable.id),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  ...withModificationDates
}, (table) => ({
  nameIndex: index("challenge_name_idx").on(table.name),
  dateIndex: index("challenge_date_idx").on(table.startDate, table.endDate),
}));

// Challenge Memberships table (for many-to-many relationship)
export const ChallengeMembershipsTable = mysqlTable("challenge_memberships", {
  ...withIdPk,
  userId: int("user_id")
    .notNull()
    .references(() => UsersTable.id),
  challengeId: int("challenge_id")
    .notNull()
    .references(() => ChallengesTable.id),
  communityId: int("community_id")
    .notNull()
    .references(() => CommunitiesTable.id),
  joinedAt: timestamp("joined_at").defaultNow(),
}, (table) => ({
  uniqueMembership: index("user_challenge_unique").on(table.userId, table.challengeId),
}));

export const ChallengeInvitationsTable = mysqlTable("challenge_invitations", {
  ...withIdPk,
  challengeId: int("challenge_id")
    .notNull()
    .references(() => ChallengesTable.id),
  inviterId: int("inviter_id")
    .notNull()
    .references(() => UsersTable.id),
  inviteeId: int("invitee_id")
    .notNull()
    .references(() => UsersTable.id),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  expiresAt: timestamp("expires_at"),
  ...withModificationDates
});

export type Challenge = typeof ChallengesTable.$inferSelect;
export type NewChallenge = typeof ChallengesTable.$inferInsert;

export type ChallengeMembership = typeof ChallengeMembershipsTable.$inferSelect;
export type NewChallengeMembership = typeof ChallengeMembershipsTable.$inferInsert;

export type ChallengeInvitation = typeof ChallengeInvitationsTable.$inferSelect;
export type NewChallengeInvitation = typeof ChallengeInvitationsTable.$inferInsert;