import type { Community as PgCommunity, User as PgUser } from "@o/db";

export type PgCommunityComposite = PgCommunity & {
  owner: PgUser;
};
