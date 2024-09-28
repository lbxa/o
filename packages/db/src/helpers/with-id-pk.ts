import { int } from "drizzle-orm/mysql-core";

export const withIdPk = {
  id: int("id").primaryKey().autoincrement(),
};
