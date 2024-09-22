import { timestamp } from "drizzle-orm/mysql-core";

export const withModificationDates = {
  createdAt: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").onUpdateNow(),
};
