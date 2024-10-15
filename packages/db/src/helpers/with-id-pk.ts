import { int } from "drizzle-orm/mysql-core";

export const withIdPk = {
  id: int().primaryKey().autoincrement(),
};
