import { uuid } from "drizzle-orm/pg-core";

export const withUuidPk = {
  id: uuid().primaryKey().defaultRandom(),
};
