import { relations } from "drizzle-orm";
import {
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { withIdPk, withModificationDates } from "../helpers";
import { InvitationStatusEnum } from "../helpers/invitation-status-enum";
import { CommunitiesTable } from "./community-schema";
import { UsersTable } from "./user-schema";

export const ChallengesTable = mysqlTable(
  "challenges",
  {
    ...withIdPk,
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description").notNull(),
    communityId: int("community_id")
      .notNull()
      .references(() => CommunitiesTable.id),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    ...withModificationDates,
  },
  (table) => ({
    nameIndex: index("challenge_name_idx").on(table.name),
    communityIndex: index("community_idx").on(table.communityId),
    dateIndex: index("challenge_date_idx").on(table.startDate, table.endDate),
  })
);

export const ChallengesRelations = relations(
  ChallengesTable,
  ({ one, many }) => ({
    community: one(CommunitiesTable, {
      fields: [ChallengesTable.communityId],
      references: [CommunitiesTable.id],
      relationName: "challengeCommunity",
    }),
    memberships: many(ChallengeMembershipsTable, {
      relationName: "challengeMemberships",
    }),
    invitations: many(ChallengeInvitationsTable, {
      relationName: "challengeInvitations",
    }),
  })
);

// Challenge Memberships table (for many-to-many relationship)
export const ChallengeMembershipsTable = mysqlTable(
  "challenge_memberships",
  {
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
    joinedAt: timestamp("joined_at").notNull().defaultNow(),
  },
  (table) => ({
    uniqueMembership: index("user_challenge_unique").on(
      table.userId,
      table.challengeId
    ),
  })
);

export const ChallengeMembershipsRelations = relations(
  ChallengeMembershipsTable,
  ({ one }) => ({
    user: one(UsersTable, {
      fields: [ChallengeMembershipsTable.userId],
      references: [UsersTable.id],
      relationName: "challengeMembershipUser",
    }),
    community: one(CommunitiesTable, {
      fields: [ChallengeMembershipsTable.communityId],
      references: [CommunitiesTable.id],
      relationName: "challengeMembershipCommunity",
    }),
    challenge: one(ChallengesTable, {
      fields: [ChallengeMembershipsTable.challengeId],
      references: [ChallengesTable.id],
      relationName: "challengeMembershipChallenge",
    }),
  })
);

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
  status: InvitationStatusEnum.notNull().default("PENDING"),
  expiresAt: timestamp("expires_at").notNull(),
  ...withModificationDates,
});

export const ChallengeInvitationsRelations = relations(
  ChallengeInvitationsTable,
  ({ one }) => ({
    challenge: one(ChallengesTable, {
      fields: [ChallengeInvitationsTable.challengeId],
      references: [ChallengesTable.id],
      relationName: "challengeInvitationChallenge",
    }),
    inviter: one(UsersTable, {
      fields: [ChallengeInvitationsTable.inviterId],
      references: [UsersTable.id],
      relationName: "challengeInvitationInviter",
    }),
    invitee: one(UsersTable, {
      fields: [ChallengeInvitationsTable.inviteeId],
      references: [UsersTable.id],
      relationName: "challengeInvitationInvitee",
    }),
  })
);

export type Challenge = typeof ChallengesTable.$inferSelect;
export type NewChallenge = typeof ChallengesTable.$inferInsert;

export type ChallengeMembership = typeof ChallengeMembershipsTable.$inferSelect;
export type NewChallengeMembership =
  typeof ChallengeMembershipsTable.$inferInsert;

export type ChallengeInvitation = typeof ChallengeInvitationsTable.$inferSelect;
export type NewChallengeInvitation =
  typeof ChallengeInvitationsTable.$inferInsert;
