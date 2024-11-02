import type { AnyPgTable } from "drizzle-orm/pg-core";

import type { Node } from "../types/graphql";

/**
 * Maps a Postgres entity to a GraphQL entity. Very useful
 * for complex types with enums and global ids.
 *
 * @see https://github.com/drizzle-team/drizzle-orm/discussions/1767#discussioncomment-8041562
 */
export interface EntityMapper<
  T extends AnyPgTable,
  PgType extends T["$inferSelect"],
  GqlType extends Node,
> {
  pg2GqlMapper(pgEntity: PgType): GqlType;
}

export interface AsyncEntityMapper<
  T extends AnyPgTable,
  PgType extends T["$inferSelect"],
  GqlType extends Node,
> {
  pg2GqlMapperAsync(pgEntity: PgType): Promise<GqlType>;
}
