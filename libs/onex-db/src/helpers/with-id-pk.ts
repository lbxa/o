import { serial } from "drizzle-orm/pg-core";

export const withIdPk = {
  id: serial().primaryKey(),
};
