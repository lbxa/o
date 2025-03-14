import type { MultiSizedImage } from "@o/utils";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgSchema,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

import { $C, withIdPk, withModificationDates } from "../helpers";
import { InvitationStatus } from "./shared/invitation-status-enum";
import { UsersTable } from "./user.schema";

export const CommunitySchema = pgSchema("community");

export const CommunitiesTable = CommunitySchema.table(
  "communities",
  {
    ...withIdPk,
    name: varchar({ length: 255 }).unique().notNull(),
    isPublic: boolean().notNull().default(true),
    isVerified: boolean().notNull().default(false),
    imageUrl: jsonb().$type<MultiSizedImage>(),
    ownerId: integer()
      .notNull()
      .references(() => UsersTable.id),
    ...withModificationDates,
  },
  (table) => [index().on(table.name)]
);

export const CommunityMembershipsTable = CommunitySchema.table(
  "memberships",
  {
    ...withIdPk,
    userId: integer()
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    communityId: integer()
      .notNull()
      .references(() => CommunitiesTable.id, { onDelete: "cascade" }),
    isAdmin: boolean().notNull().default(false),
    joinedAt: timestamp({
      mode: "date",
      withTimezone: true,
      precision: $C.TIMEZONE_PRECISION,
    }).defaultNow(),
  },
  (table) => [
    index().on(table.userId, table.communityId),
    unique().on(table.userId, table.communityId),
  ]
);

export const CommunityInvitationsTable = CommunitySchema.table(
  "invitations",
  {
    ...withIdPk,
    communityId: integer()
      .notNull()
      .references(() => CommunitiesTable.id, { onDelete: "cascade" }),
    inviterId: integer()
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    inviteeId: integer()
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    status: InvitationStatus().notNull().default("PENDING"),
    expiresAt: timestamp({
      mode: "date",
      withTimezone: true,
      precision: $C.TIMEZONE_PRECISION,
    }).notNull(),
    ...withModificationDates,
  },
  (table) => [unique().on(table.inviterId, table.inviteeId, table.communityId)]
);

export type Community = typeof CommunitiesTable.$inferSelect;
export type NewCommunity = typeof CommunitiesTable.$inferInsert;

export type CommunityMembership = typeof CommunityMembershipsTable.$inferSelect;
export type NewCommunityMembership =
  typeof CommunityMembershipsTable.$inferInsert;

export type CommunityInvitation = typeof CommunityInvitationsTable.$inferSelect;
export type NewCommunityInvitation =
  typeof CommunityInvitationsTable.$inferInsert;
