import {
  boolean,
  index,
  int,
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { users } from "./user";

export const communities = mysqlTable(
  "communities",
  {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).unique().notNull(),
    isPublic: boolean("is_public").notNull().default(true),
    ownerId: int("owner_id")
      .notNull()
      .references(() => users.id),
  },
  (table) => ({
    nameIndex: index("name_idx").on(table.name),
  })
);

export type Community = typeof communities.$inferSelect;
export type NewCommunity = typeof communities.$inferInsert;

// export const events = mysqlTable(
//   "events",
//   {
//     id: int("id").primaryKey().autoincrement(),
//     name: varchar("name", { length: 255 }).notNull(),
//     communityId: int("community_id").references(() => communities.id),
//   },
//   (table) => ({
//     communityIdIndex: index("community_id_idx").on(table.communityId),
//   })
// );

// export type Event = typeof events.$inferSelect;
// export type NewEvent = typeof events.$inferInsert;

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

export const communityInvitations = mysqlTable(
  "community_invitations",
  {
    id: int("id").primaryKey().autoincrement(),
    communityId: int("community_id")
      .notNull()
      .references(() => communities.id),
    invitedUserId: int("invited_user_id")
      .notNull()
      .references(() => users.id),
    invitedByUserId: int("invited_by_user_id")
      .notNull()
      .references(() => users.id),
    status: varchar("status", { length: 50 }).notNull().default("pending"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    communityInvitedUserIndex: index("community_invited_user_idx").on(
      table.communityId,
      table.invitedUserId
    ),
  })
);
