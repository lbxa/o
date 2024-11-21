import { sql } from "drizzle-orm";
import { index, pgSchema, text, varchar } from "drizzle-orm/pg-core";

import { withIdPk, withModificationDates } from "../helpers";

export const UserSchema = pgSchema("user");

export const UsersTable = UserSchema.table(
  "users",
  {
    ...withIdPk,
    firstName: text().notNull(),
    lastName: text().notNull(),
    email: varchar({ length: 255 }).unique().notNull(),
    handle: varchar({ length: 255 }).unique(),
    password: varchar({ length: 255 }).notNull(),
    refreshToken: varchar({ length: 1000 }),
    avatarUrl: varchar({ length: 1000 }),
    ...withModificationDates,
  },
  (table) => ({
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

export type User = typeof UsersTable.$inferSelect;
export type NewUser = typeof UsersTable.$inferInsert;
