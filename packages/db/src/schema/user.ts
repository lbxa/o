import { index, int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: int("id").primaryKey().autoincrement(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    handle: varchar("handle", { length: 255 }).unique(),
    password: varchar("password", { length: 255 }).notNull(),
    refreshToken: varchar("refreshToken", { length: 1000 }),
  },
  (table) => ({
    emailIndex: index("email_idx").on(table.email),
    handleIndex: index("handle_idx").on(table.handle),
  })
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
