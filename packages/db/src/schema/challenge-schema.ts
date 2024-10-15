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
    name: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
    communityId: int()
      .notNull()
      .references(() => CommunitiesTable.id),
    startDate: timestamp().notNull(),
    endDate: timestamp().notNull(),
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
    }),
    memberships: many(ChallengeMembershipsTable),
    invitations: many(ChallengeInvitationsTable),
  })
);

// Challenge Memberships table (for many-to-many relationship)
export const ChallengeMembershipsTable = mysqlTable(
  "challenge_memberships",
  {
    ...withIdPk,
    userId: int()
      .notNull()
      .references(() => UsersTable.id),
    challengeId: int()
      .notNull()
      .references(() => ChallengesTable.id),
    communityId: int()
      .notNull()
      .references(() => CommunitiesTable.id),
    joinedAt: timestamp().notNull().defaultNow(),
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

export const ChallengeInvitationsTable = mysqlTable("challenge_invitations", {
  ...withIdPk,
  challengeId: int()
    .notNull()
    .references(() => ChallengesTable.id),
  inviterId: int()
    .notNull()
    .references(() => UsersTable.id),
  inviteeId: int()
    .notNull()
    .references(() => UsersTable.id),
  status: InvitationStatusEnum.notNull().default("PENDING"),
  expiresAt: timestamp().notNull(),
  ...withModificationDates,
});

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
      relationName: "inviter",
    }),
    invitee: one(UsersTable, {
      fields: [ChallengeInvitationsTable.inviteeId],
      references: [UsersTable.id],
      relationName: "invitee",
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
