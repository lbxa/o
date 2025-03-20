import type { AnyPgTable } from "drizzle-orm/pg-core";

export interface PostgresQueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: {
    field: string;
    direction: "asc" | "desc";
  };
}

export abstract class PostgresRepository<
  T extends AnyPgTable,
  EntityType = T["$inferSelect"],
  CreateType = T["$inferInsert"],
> {
  public abstract findById(id: number): Promise<EntityType | null>;
  public abstract findAll(
    options?: PostgresQueryOptions
  ): Promise<EntityType[]>;
  public abstract save(entity: CreateType): Promise<EntityType>;
  public abstract delete(id: number): Promise<void>;
  public abstract findBy(
    criteria: Partial<EntityType>,
    options?: PostgresQueryOptions
  ): Promise<EntityType[]>;
  public abstract exists(id: number): Promise<boolean>;
}
