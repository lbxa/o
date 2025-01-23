import { timestamp } from "drizzle-orm/pg-core";

export const withModificationDates = {
  createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: "date" }).$onUpdate(() => new Date()),
};
