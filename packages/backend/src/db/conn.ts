import type { MySql2Database } from "drizzle-orm/mysql2";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

export let connection: mysql.Connection;
export let db: MySql2Database<typeof schema>;

void (async () => {
  connection = await mysql.createConnection({
    host: "localhost",
    user: "champ_server",
    database: "champ",
    port: 3306,
    password: "ilovewinning",
    multipleStatements: true
  });

  db = drizzle(connection, { schema, mode: "default" });
})();