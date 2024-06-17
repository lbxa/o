import { mysqlTable, serial, text, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  handle: varchar("handle", { length: 255 }).unique(),
  password: varchar("password", { length: 255 }).notNull(),
  refreshToken: varchar("refreshToken", { length: 1000 }),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
