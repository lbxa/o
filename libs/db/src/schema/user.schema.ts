import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgSchema,
  text,
  unique,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { withIdPk, withModificationDates } from "../helpers";
import { InvitationStatus } from "./shared";

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
    avatarUrl: varchar({ length: 1000 }),
    ...withModificationDates,
  },
  (table) => ({
    emailUniqueIndex: uniqueIndex("email_unique_index").on(
      sql`lower(${table.email})`
    ),
    searchIndex: index("search_index").using(
      "gin",
      sql`(
        setweight(to_tsvector('english', ${table.handle}), 'A') ||
        setweight(to_tsvector('english', ${table.email}), 'B') ||
        setweight(to_tsvector('english', ${table.firstName}), 'C') ||
        setweight(to_tsvector('english', ${table.lastName}), 'D')
      )`
    ),
  })
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
  (table) => ({
    uniqueFriendship: unique().on(table.userId, table.friendId),
    reverseFriendship: index().on(table.friendId, table.userId),
  })
);

export type User = typeof UsersTable.$inferSelect;
export type NewUser = typeof UsersTable.$inferInsert;

export type UserFriendship = typeof UserFriendshipsTable.$inferSelect;
export type NewUserFriendship = typeof UserFriendshipsTable.$inferInsert;
