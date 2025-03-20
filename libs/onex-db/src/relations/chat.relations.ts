import { relations } from "drizzle-orm";

import {
  ChatMembersTable,
  ChatMessagesTable,
  ChatReadReceiptsTable,
  ChatsTable,
} from "../schema/chat.schema";
import { UsersTable } from "../schema/user.schema";

export const ChatsRelations = relations(ChatsTable, ({ many }) => ({
  members: many(ChatMembersTable),
  messages: many(ChatMessagesTable),
}));

export const ChatMembersRelations = relations(ChatMembersTable, ({ one }) => ({
  chat: one(ChatsTable, {
    fields: [ChatMembersTable.chatId],
    references: [ChatsTable.id],
  }),
  user: one(UsersTable, {
    fields: [ChatMembersTable.userId],
    references: [UsersTable.id],
  }),
}));

export const ChatMessagesRelations = relations(
  ChatMessagesTable,
  ({ one, many }) => ({
    chat: one(ChatsTable, {
      fields: [ChatMessagesTable.chatId],
      references: [ChatsTable.id],
    }),
    sender: one(UsersTable, {
      fields: [ChatMessagesTable.senderId],
      references: [UsersTable.id],
    }),
    readReceipts: many(ChatReadReceiptsTable),
  })
);

export const ChatReadReceiptsRelations = relations(
  ChatReadReceiptsTable,
  ({ one }) => ({
    message: one(ChatMessagesTable, {
      fields: [ChatReadReceiptsTable.messageId],
      references: [ChatMessagesTable.id],
    }),
    user: one(UsersTable, {
      fields: [ChatReadReceiptsTable.userId],
      references: [UsersTable.id],
    }),
  })
);
