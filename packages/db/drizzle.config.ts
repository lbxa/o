import dotenv from "dotenv";
import { defineConfig, Config as DrizzleConfig } from "drizzle-kit";

const envFile = () => {
  switch (process.env.NODE_ENV) {
    case "local":
      return ".env.local";
    case "development":
      return ".env.dev";
    default:
      return ".env.local";
  }
};

dotenv.config({ path: envFile() });

const { DB_HOSTNAME, DB_USER, DB_NAME, DB_PORT, DB_PASSWORD, DB_SSL } = process.env;

if (!DB_HOSTNAME || !DB_USER || !DB_NAME || !DB_PORT || !DB_PASSWORD || !DB_SSL) {
  throw new Error("Database credentials not found");
}

export default defineConfig({
  schema: ["./src/index.ts"],
  out: "./migrations",
  dialect: "postgresql",
  casing: "snake_case",
  schemaFilter: ["user", "community", "challenge"],
  dbCredentials: {
    host: DB_HOSTNAME,
    user: DB_USER,
    database: DB_NAME,
    port: Number(DB_PORT),
    password: DB_PASSWORD,
    ssl: DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  },
}) satisfies DrizzleConfig;
