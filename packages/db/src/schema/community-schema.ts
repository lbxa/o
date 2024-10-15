import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  int,
  mysqlTable,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/mysql-core";

import { withIdPk, withModificationDates } from "../helpers";
import { InvitationStatusEnum } from "../helpers/invitation-status-enum";
import { ChallengesTable } from "./challenge-schema";
import { UsersTable } from "./user-schema";

export const CommunitiesTable = mysqlTable(
  "communities",
  {
    ...withIdPk,
    name: varchar({ length: 255 }).unique().notNull(),
    isPublic: boolean().notNull().default(true),
    isVerified: boolean().notNull().default(false),
    ownerId: int()
      .notNull()
      .references(() => UsersTable.id),
    ...withModificationDates,
  },
  (table) => ({
    nameIndex: index("name_idx").on(table.name),
  })
);

export const CommunitiesRelations = relations(
  CommunitiesTable,
  ({ one, many }) => ({
    owner: one(UsersTable, {
      fields: [CommunitiesTable.ownerId],
      references: [UsersTable.id],
    }),
    memberships: many(CommunityMembershipsTable),
    invitations: many(CommunityInvitationsTable),
    challenges: many(ChallengesTable),
  })
);

// User-Community relation (many-to-many)
export const CommunityMembershipsTable = mysqlTable(
  "community_memberships",
  {
    ...withIdPk,
    userId: int()
      .notNull()
      .references(() => UsersTable.id),
    communityId: int()
      .notNull()
      .references(() => CommunitiesTable.id),
    isAdmin: boolean().notNull().default(false),
    joinedAt: timestamp().defaultNow(),
  },
  (table) => ({
    uniqueMembership: index("user_community_unique").on(
      table.userId,
      table.communityId
    ),
  })
);

export const CommunityMembershipsRelations = relations(
  CommunityMembershipsTable,
  ({ one }) => ({
    user: one(UsersTable, {
      fields: [CommunityMembershipsTable.userId],
      references: [UsersTable.id],
    }),
    community: one(CommunitiesTable, {
      fields: [CommunityMembershipsTable.communityId],
      references: [CommunitiesTable.id],
    }),
  })
);

// Community Invitations table
export const CommunityInvitationsTable = mysqlTable(
  "community_invitations",
  {
    ...withIdPk,
    communityId: int()
      .notNull()
      .references(() => CommunitiesTable.id),
    inviterId: int()
      .notNull()
      .references(() => UsersTable.id),
    inviteeId: int()
      .notNull()
      .references(() => UsersTable.id),
    status: InvitationStatusEnum.notNull().default("PENDING"),
    expiresAt: timestamp().notNull(),
    ...withModificationDates,
  },
  (table) => ({
    uniqueMembership: unique("idempotent_invites").on(
      table.inviterId,
      table.inviteeId,
      table.communityId
    ),
  })
);

export const CommunityInvitationsRelations = relations(
  CommunityInvitationsTable,
  ({ one }) => ({
    community: one(CommunitiesTable, {
      fields: [CommunityInvitationsTable.communityId],
      references: [CommunitiesTable.id],
    }),
    inviter: one(UsersTable, {
      fields: [CommunityInvitationsTable.inviterId],
      references: [UsersTable.id],
      relationName: "inviter",
    }),
    invitee: one(UsersTable, {
      fields: [CommunityInvitationsTable.inviteeId],
      references: [UsersTable.id],
      relationName: "invitee",
    }),
  })
);

export type Community = typeof CommunitiesTable.$inferSelect;
export type NewCommunity = typeof CommunitiesTable.$inferInsert;

export type CommunityMembership = typeof CommunityMembershipsTable.$inferSelect;
export type NewCommunityMembership =
  typeof CommunityMembershipsTable.$inferInsert;

export type CommunityInvitation = typeof CommunityInvitationsTable.$inferSelect;
export type NewCommunityInvitation =
  typeof CommunityInvitationsTable.$inferInsert;
