import { timestamp } from "drizzle-orm/pg-core";

export const withModificationDates = {
  createdAt: timestamp({ mode: "date", withTimezone: true, precision: 6 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp({
    mode: "date",
    withTimezone: true,
    precision: 6,
  }).$onUpdate(() => new Date()),
};
