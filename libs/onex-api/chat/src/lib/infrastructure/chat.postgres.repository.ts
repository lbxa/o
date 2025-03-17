import type { ChatRepository } from "./chat.repository";

interface _ChatPostgresRepository extends ChatRepository {
  _: never;
}
