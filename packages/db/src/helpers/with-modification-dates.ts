import { timestamp } from "drizzle-orm/mysql-core";

export const withModificationDates = {
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().onUpdateNow(),
};
