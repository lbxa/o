import { mysqlTable, text, serial } from 'drizzle-orm/mysql-core';

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;