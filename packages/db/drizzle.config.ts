import "dotenv/config";

import { defineConfig, Config as DrizzleConfig } from "drizzle-kit";

const { DB_HOSTNAME, DB_USER, DB_NAME, DB_PORT, DB_PASSWORD } = process.env;

if (!DB_HOSTNAME || !DB_USER || !DB_NAME || !DB_PORT || !DB_PASSWORD) {
  throw new Error("Invalid DB creds");
}

export default defineConfig({
  schema: "./src/schema/*.ts",
  out: "./drizzle",
  dialect: "mysql", 
  introspect: {
    casing: "camel"
  },
  dbCredentials: {
    host: DB_HOSTNAME,
    user: DB_USER,
    database: DB_NAME,
    port: Number(DB_PORT),
    password: DB_PASSWORD,
  },
}) satisfies DrizzleConfig;
