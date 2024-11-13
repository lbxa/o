import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgSchema,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

import { withIdPk, withModificationDates } from "../helpers";
import { ChallengesTable } from "./challenge.schema";
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
    ownerId: integer()
      .notNull()
      .references(() => UsersTable.id),
    ...withModificationDates,
  },
  (table) => ({
    nameIdx: index().on(table.name),
  })
);

// export const CommunitiesRelations = relations(
//   CommunitiesTable,
//   ({ one, many }) => ({
//     owner: one(UsersTable, {
//       fields: [CommunitiesTable.ownerId],
//       references: [UsersTable.id],
//     }),
//     memberships: many(CommunityMembershipsTable),
//     invitations: many(CommunityInvitationsTable),
//     challenges: many(ChallengesTable),
//   })
// );

export const CommunityMembershipsTable = CommunitySchema.table(
  "memberships",
  {
    ...withIdPk,
    userId: integer()
      .notNull()
      .references(() => UsersTable.id),
    communityId: integer()
      .notNull()
      .references(() => CommunitiesTable.id),
    isAdmin: boolean().notNull().default(false),
    joinedAt: timestamp().defaultNow(),
  },
  (table) => ({
    userCommunityMembershipIdx: index().on(table.userId, table.communityId),
  })
);

// export const CommunityMembershipsRelations = relations(
//   CommunityMembershipsTable,
//   ({ one }) => ({
//     user: one(UsersTable, {
//       fields: [CommunityMembershipsTable.userId],
//       references: [UsersTable.id],
//     }),
//     community: one(CommunitiesTable, {
//       fields: [CommunityMembershipsTable.communityId],
//       references: [CommunitiesTable.id],
//     }),
//   })
// );

export const CommunityInvitationsTable = CommunitySchema.table(
  "invitations",
  {
    ...withIdPk,
    communityId: integer()
      .notNull()
      .references(() => CommunitiesTable.id),
    inviterId: integer()
      .notNull()
      .references(() => UsersTable.id),
    inviteeId: integer()
      .notNull()
      .references(() => UsersTable.id),
    status: InvitationStatus().notNull().default("PENDING"),
    expiresAt: timestamp().notNull(),
    ...withModificationDates,
  },
  (table) => ({
    idempotentInvite: unique().on(
      table.inviterId,
      table.inviteeId,
      table.communityId
    ),
  })
);

// export const CommunityInvitationsRelations = relations(
//   CommunityInvitationsTable,
//   ({ one }) => ({
//     community: one(CommunitiesTable, {
//       fields: [CommunityInvitationsTable.communityId],
//       references: [CommunitiesTable.id],
//     }),
//     inviter: one(UsersTable, {
//       fields: [CommunityInvitationsTable.inviterId],
//       references: [UsersTable.id],
//       relationName: "inviter",
//     }),
//     invitee: one(UsersTable, {
//       fields: [CommunityInvitationsTable.inviteeId],
//       references: [UsersTable.id],
//       relationName: "invitee",
//     }),
//   })
// );

export type Community = typeof CommunitiesTable.$inferSelect;
export type NewCommunity = typeof CommunitiesTable.$inferInsert;

export type CommunityMembership = typeof CommunityMembershipsTable.$inferSelect;
export type NewCommunityMembership =
  typeof CommunityMembershipsTable.$inferInsert;

export type CommunityInvitation = typeof CommunityInvitationsTable.$inferSelect;
export type NewCommunityInvitation =
  typeof CommunityInvitationsTable.$inferInsert;
