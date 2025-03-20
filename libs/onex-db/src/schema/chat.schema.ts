import {
  index,
  integer,
  pgSchema,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { $C, withModificationDates, withUuidPk } from "../helpers";
import { UsersTable } from "./user.schema";

export const ChatSchema = pgSchema("chat");

export const ChatRoomType = ChatSchema.enum("chat_type", ["DM", "GROUP"]);

export const ChatsTable = ChatSchema.table(
  "chats",
  {
    ...withUuidPk,
    type: ChatRoomType().notNull(),
    name: varchar({ length: 100 }),
    maxParticipants: integer().default(50), // TODO This limit can be lifted with better infra
    lastMessageAt: timestamp({
      mode: "date",
      withTimezone: true,
      precision: $C.TIMEZONE_PRECISION,
    })
      .notNull()
      .defaultNow(),
    ...withModificationDates,
  },
  (table) => [index().on(table.createdAt), index().on(table.name)]
);

export const ChatMembersTable = ChatSchema.table(
  "members",
  {
    ...withUuidPk,
    chatId: uuid()
      .notNull()
      .references(() => ChatsTable.id, { onDelete: "cascade" }),
    userId: integer()
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    ...withModificationDates,
  },
  (table) => [index().on(table.userId), index().on(table.chatId)]
);

export const ChatMessagesTable = ChatSchema.table(
  "messages",
  {
    ...withUuidPk,
    chatId: uuid()
      .notNull()
      .references(() => ChatsTable.id, { onDelete: "cascade" }),
    senderId: integer()
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    content: text().notNull(),
    deliveredAt: timestamp({
      // TODO add delivered receipts column (for now keep simple)
      mode: "date",
      withTimezone: true,
      precision: $C.TIMEZONE_PRECISION,
    }),
    ...withModificationDates,
  },
  (table) => [
    index().on(table.chatId, table.createdAt),
    index().on(table.senderId),
    index().on(table.createdAt),
  ]
);

export const ChatReadReceiptsTable = ChatSchema.table(
  "read_receipts",
  {
    ...withUuidPk,
    messageId: uuid()
      .notNull()
      .references(() => ChatMessagesTable.id, { onDelete: "cascade" }),
    userId: integer()
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    ...withModificationDates,
  },
  (table) => [
    index().on(table.messageId, table.userId),
    index().on(table.userId, table.createdAt),
  ]
);

export type Chat = typeof ChatsTable.$inferSelect;
export type NewChat = typeof ChatsTable.$inferInsert;

export type ChatMember = typeof ChatMembersTable.$inferSelect;
export type NewChatMember = typeof ChatMembersTable.$inferInsert;

export type ChatMessage = typeof ChatMessagesTable.$inferSelect;
export type NewChatMessage = typeof ChatMessagesTable.$inferInsert;

export type ChatReadReceipt = typeof ChatReadReceiptsTable.$inferSelect;
export type NewChatReadReceipt = typeof ChatReadReceiptsTable.$inferInsert;
