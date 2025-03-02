import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import pg from "pg";

import { $DrizzleSchema } from "../index";

dotenv.config({ path: ".env.local" });

if (
  !process.env.DB_HOSTNAME ||
  !process.env.DB_USER ||
  !process.env.DB_NAME ||
  !process.env.DB_PORT ||
  !process.env.DB_PASSWORD
) {
  throw new Error("Database credentials not found");
}

if (!["localhost", "127.0.0.1"].includes(process.env.DB_HOSTNAME)) {
  throw new Error("Cannot seed non-localhost database xd");
}

const pool = new pg.Pool({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  ssl: false, // always run locally
});

const db = drizzle(pool, { schema: $DrizzleSchema });

void (async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Database connection successful");
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }

  await seed(db, {
    users: $DrizzleSchema.UsersTable,
  }).refine((funcs) => ({
    users: {
      count: 20,
      columns: {
        id: funcs.intPrimaryKey(),
        firstName: funcs.firstName(),
        lastName: funcs.lastName(),
        email: funcs.email(),
        password: funcs.string({ isUnique: true }),
        bio: funcs.string({ isUnique: true }),
        createdAt: funcs.date(),
        updatedAt: funcs.date(),
      },
    },
  }));
})()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(() => {
    void pool.end();
  });
