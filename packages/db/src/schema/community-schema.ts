import {
  boolean,
  index,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { UsersTable } from "./user-schema";
import { withIdPk, withModificationDates } from "../helpers";

export const CommunitiesTable = mysqlTable(
  "communities",
  {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).unique().notNull(),
    isPublic: boolean("is_public").notNull().default(true),
    isVerified: boolean("is_verified").notNull().default(false),
    ownerId: int("owner_id")
      .notNull()
      .references(() => UsersTable.id),
  },
  (table) => ({
    nameIndex: index("name_idx").on(table.name),
  })
);

// User-Community relation (many-to-many)
export const CommunityMembershipsTable = mysqlTable("community_memberships", {
  ...withIdPk,
  userId: int("user_id")
    .notNull()
    .references(() => UsersTable.id),
  communityId: int("community_id")
    .notNull()
    .references(() => CommunitiesTable.id),
  isAdmin: boolean("is_admin").notNull().default(false),
  joinedAt: timestamp("joined_at").defaultNow(),
}, (table) => ({
  uniqueMembership: index("user_community_unique").on(table.userId, table.communityId),
}));

// Community Invitations table
export const CommunityInvitationsTable = mysqlTable("community_invitations", {
  ...withIdPk,
  communityId: int("community_id")
    .notNull()
    .references(() => CommunitiesTable.id),
  inviterId: int("inviter_id")
    .notNull()
    .references(() => UsersTable.id),
  inviteeId: int("invitee_id")
    .notNull()
    .references(() => UsersTable.id),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  expiresAt: timestamp("expires_at"),
  ...withModificationDates,
});

export type Community = typeof CommunitiesTable.$inferSelect;
export type NewCommunity = typeof CommunitiesTable.$inferInsert;

export type CommunityMembership = typeof CommunityMembershipsTable.$inferSelect;
export type NewCommunityMembership = typeof CommunityMembershipsTable.$inferInsert;

export type CommunityInvitation = typeof CommunityInvitationsTable.$inferSelect;
export type NewCommunityInvitation = typeof CommunityInvitationsTable.$inferInsert;