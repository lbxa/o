import { sql } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgSchema,
  text,
  unique,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { withIdPk, withModificationDates } from "../helpers";
import {
  ChallengeActivitiesTable,
  ChallengeActivityResultsTable,
  ChallengesTable,
} from "./challenge.schema";
import { InvitationStatus } from "./shared";
import type { ImageUrl } from "./shared/image-url";

export const UserSchema = pgSchema("user");

export const UsersTable = UserSchema.table(
  "users",
  {
    ...withIdPk,
    firstName: text().notNull(),
    lastName: text().notNull(),
    email: varchar({ length: 255 }).notNull(),
    handle: varchar({ length: 255 }).unique(),
    bio: varchar({ length: 160 }),
    password: varchar({ length: 255 }).notNull(),
    refreshToken: varchar({ length: 1000 }),
    avatarUrl: jsonb().$type<ImageUrl>(),
    ...withModificationDates,
  },
  (table) => [
    uniqueIndex("email_unique_index").on(sql`lower(${table.email})`),
    index("search_index").using(
      "gin",
      sql`(
        setweight(to_tsvector('english', ${table.handle}), 'A') ||
        setweight(to_tsvector('english', ${table.email}), 'B') ||
        setweight(to_tsvector('english', ${table.firstName}), 'C') ||
        setweight(to_tsvector('english', ${table.lastName}), 'D')
      )`
    ),
  ]
);

export const UserFriendshipsTable = UserSchema.table(
  "friendships",
  {
    ...withIdPk,
    userId: integer()
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    friendId: integer()
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    status: InvitationStatus().notNull().default("PENDING"),
    ...withModificationDates,
  },
  (table) => [
    unique().on(table.userId, table.friendId),
    index().on(table.friendId, table.userId),
  ]
);

export const UserStreaksTable = UserSchema.table("streaks", {
  ...withIdPk,
  userId: integer()
    .notNull()
    .references(() => UsersTable.id, { onDelete: "cascade" }),
  currentStreak: integer().notNull().default(0),
  longestStreak: integer().notNull().default(0),
  ...withModificationDates,
});

export const UserRecordsTable = UserSchema.table(
  "records",
  {
    ...withIdPk,
    userId: integer()
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    challengeId: integer()
      .notNull()
      .references(() => ChallengesTable.id, { onDelete: "cascade" }),
    activityId: integer()
      .notNull()
      .references(() => ChallengeActivitiesTable.id, { onDelete: "cascade" }),
    activityResultId: integer()
      .notNull()
      .references(() => ChallengeActivityResultsTable.id, {
        onDelete: "cascade",
      }),
    ...withModificationDates,
  },
  (table) => [index().on(table.userId, table.createdAt)]
);

export type User = typeof UsersTable.$inferSelect;
export type NewUser = typeof UsersTable.$inferInsert;

export type UserFriendship = typeof UserFriendshipsTable.$inferSelect;
export type NewUserFriendship = typeof UserFriendshipsTable.$inferInsert;

export type UserStreak = typeof UserStreaksTable.$inferSelect;
export type NewUserStreak = typeof UserStreaksTable.$inferInsert;

export type UserRecord = typeof UserRecordsTable.$inferSelect;
export type NewUserRecord = typeof UserRecordsTable.$inferInsert;
