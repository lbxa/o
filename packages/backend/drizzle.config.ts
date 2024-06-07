import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'mysql', // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    host: "localhost",
    user: "champ_server",
    database: "champ",
    port: 3306,
    password: "ilovewinning"
  },
});