import { timestamp } from "drizzle-orm/pg-core";

import { $C } from "./constants";

export const withModificationDates = {
  createdAt: timestamp({
    mode: "date",
    withTimezone: true,
    precision: $C.TIMEZONE_PRECISION,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp({
    mode: "date",
    withTimezone: true,
    precision: $C.TIMEZONE_PRECISION,
  }).$onUpdate(() => new Date()),
};
