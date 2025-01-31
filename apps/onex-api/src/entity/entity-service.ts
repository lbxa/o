import type { AnyPgTable } from "drizzle-orm/pg-core";

import type { Node } from "../types/graphql";
import type { EntityType } from "./entity.types";

/**
 * All services should hold a minimum standard of functionality:
 * - Ability to map a Postgres entity to a GraphQL entity
 * - Ability to find a single entity by pk id
 *
 * This standardisation will come in handy for ensuring the backend
 * scales well as the product domain expands
 *
 * A composite type is a type that is a combination of multiple
 * Postgres types. This is useful for services that need to
 * return a single entity that is a combination of multiple
 * Postgres tables. Happens quite a lot with drizzle as the
 * relational layer.
 *
 * For more context on drizzle type safety:
 * @see https://github.com/drizzle-team/drizzle-orm/discussions/1767#discussioncomment-8041562
 */
export interface EntityService<
  T extends AnyPgTable = AnyPgTable,
  PgType extends T["$inferSelect"] = T["$inferSelect"],
  GqlType extends Node = Node,
  CompositePgType extends PgType = PgType,
  // EdgeType extends Edge<GqlType> = Edge<GqlType>,
> {
  getTypename(): EntityType;
  pg2GqlMapper(pgEntity: CompositePgType): GqlType;
  findBy(
    fields: Partial<Record<keyof PgType, number | number[]>>
  ): Promise<GqlType[]>;
  findById(id: number): Promise<GqlType | undefined>;
  // buildEdge(pgEntity: PgType): EdgeType;
}
