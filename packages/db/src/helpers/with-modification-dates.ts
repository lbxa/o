import { timestamp } from "drizzle-orm/mysql-core";

export const withModificationDates = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
};
