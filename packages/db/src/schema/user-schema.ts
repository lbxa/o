import { mysqlTable, text, varchar } from "drizzle-orm/mysql-core";

import { withIdPk, withModificationDates } from "../helpers";

export const UsersTable = mysqlTable("users", {
  ...withIdPk,
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  fullName: text("full_name").notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  handle: varchar("handle", { length: 255 }).unique(),
  password: varchar("password", { length: 255 }).notNull(),
  refreshToken: varchar("refreshToken", { length: 1000 }),
  avatarUrl: varchar("avatar_url", { length: 1000 }),
  ...withModificationDates,
});

export type User = typeof UsersTable.$inferSelect;
export type NewUser = typeof UsersTable.$inferInsert;
