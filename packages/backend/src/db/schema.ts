import {
  index,
  int,
  mysqlTable,
  primaryKey,
  text,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: int("id").primaryKey().autoincrement(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    handle: varchar("handle", { length: 255 }).unique(),
    password: varchar("password", { length: 255 }).notNull(),
    refreshToken: varchar("refreshToken", { length: 1000 }),
  },
  (table) => ({
    emailIndex: index("email_idx").on(table.email),
    handleIndex: index("handle_idx").on(table.handle),
  })
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const communities = mysqlTable(
  "communities",
  {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).unique().notNull(),
  },
  (table) => ({
    nameIndex: index("name_idx").on(table.name),
  })
);

export type Community = typeof communities.$inferSelect;
export type NewCommunity = typeof communities.$inferInsert;

export const events = mysqlTable(
  "events",
  {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    communityId: int("community_id").references(() => communities.id),
  },
  (table) => ({
    communityIdIndex: index("community_id_idx").on(table.communityId),
  })
);

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;

// User-Community relation (many-to-many)
export const userCommunities = mysqlTable(
  "user_communities",
  {
    userId: int("user_id").references(() => users.id),
    communityId: int("community_id").references(() => communities.id),
  },
  (table) => ({
    compositePk: primaryKey({ columns: [table.userId, table.communityId] }),
  })
);
