import type { AnyPgTable } from "drizzle-orm/pg-core";

import type { Node } from "../types/graphql";

/**
 * All repositories should hold a minimum standard of functionality:
 * - Ability to create new entities
 * - Ability to update existing entities
 * - Ability to delete entities
 * - Ability to find a single entity by pk id
 *
 * This standardisation will come in handy for ensuring the backend
 * scales well as the product domain expands.
 *
 * There are many long-term advantages from decoupling the data
 * access layer from the business logic layer. Service files
 * should not carry all the burden of the repository.
 *
 * !Note: There should not be any presence of graphql types in any
 * !repositories. They solely focus on data access from postgres.
 *
 * For more context on drizzle type safety:
 * @see https://github.com/drizzle-team/drizzle-orm/discussions/1767#discussioncomment-8041562
 */
export interface EntityRepository<
  T extends AnyPgTable,
  PgSelectType extends T["$inferSelect"] = T["$inferSelect"],
  PgInsertType extends T["$inferInsert"] = T["$inferInsert"],
  CompositePgType extends PgSelectType = PgSelectType,
> {
  create(newEntity: PgInsertType): Promise<CompositePgType | undefined>;
  update(
    updateEntityInput: Partial<PgSelectType> & Node
  ): Promise<CompositePgType | undefined>;
  delete(id: number): Promise<boolean>;
  findBy(fields: Partial<PgSelectType>): Promise<CompositePgType[]>;
  findById(id: number): Promise<CompositePgType | undefined>;
  // getRelations(id: number): Promise<CompositePgType | undefined>;
}
