/* eslint-disable @stylistic/js/max-len */
import type * as schema from "@o/db";
import type { User as PgUser } from "@o/db";
import { UsersTable } from "@o/db";
import { desc, getTableColumns, or, sql } from "drizzle-orm";

import type { DbService } from "../../db/db.service";

/**
 * Performs a full-text search on the Users table using the provided search term.
 * This function utilizes PostgreSQL's full-text search capabilities combined with
 * trigram similarity to provide both exact and fuzzy matching of user data.
 *
 * @param dbService - An instance of the database service that provides access to the database.
 *                    It is expected to be of type `DbService` with a schema defined in `@o/db`.
 * @param searchTerm - A string representing the search term input by the user. This term is used
 *                     to query the Users table for matching records.
 * @returns A promise that resolves to an array of `GqlUser` objects. Each object represents a user
 *          record from the database that matches the search criteria. The user ID is encoded using
 *          the `encodeGlobalId` utility for global identification.
 *
 * The function constructs a full-text search query using the `ts_rank_cd` function to rank results
 * based on their relevance to the search term. It searches across multiple fields: `handle`, `email`,
 * `firstName`, and `lastName`, each with a different weight to prioritize certain fields over others.
 *
 * Additionally, the function calculates similarity scores for the `handle` and `email` fields using
 * the `similarity` function from the `pg_trgm` extension. This allows for fuzzy matching, where partial
 * or misspelled terms can still yield results.
 *
 * The results are ordered by their rank and similarity scores in descending order, ensuring that the
 * most relevant and similar matches appear first.
 *
 * Example usage:
 * ```
 * const users = await fullTextSearch(dbService, 'john.doe@example.com');
 * console.log(users);
 * ```
 *
 * Note: Ensure that the `pg_trgm` extension is enabled in your PostgreSQL database to utilize
 * the similarity functionality.
 */
export const fullTextSearch = async (
  dbService: DbService<typeof schema>,
  searchTerm: string
): Promise<PgUser[]> => {
  const ts_rank_cd = sql`ts_rank_cd(
           setweight(to_tsvector('english', ${UsersTable.handle}), 'A') ||
           setweight(to_tsvector('english', ${UsersTable.email}), 'B') ||
           setweight(to_tsvector('english', ${UsersTable.lastName}), 'C') ||
           setweight(to_tsvector('english', ${UsersTable.firstName}), 'D'),
           websearch_to_tsquery('english', ${searchTerm})
       )`;

  return await dbService.db
    .select({
      ...getTableColumns(UsersTable),
      rank: ts_rank_cd,
      handle_similarity: sql`similarity(${UsersTable.handle}, ${searchTerm})`,
      email_similarity: sql`similarity(${UsersTable.email}, ${searchTerm})`,
      last_name_similarity: sql`similarity(${UsersTable.lastName}, ${searchTerm})`,
      first_name_similarity: sql`similarity(${UsersTable.firstName}, ${searchTerm})`,
    })
    .from(UsersTable)
    .where(
      or(
        sql`
          (
            setweight(to_tsvector('english', ${UsersTable.handle}), 'A') ||
            setweight(to_tsvector('english', ${UsersTable.email}), 'B') ||
            setweight(to_tsvector('english', ${UsersTable.lastName}), 'C') ||
            setweight(to_tsvector('english', ${UsersTable.firstName}), 'D')
          ) @@ websearch_to_tsquery('english', ${searchTerm})
        `,
        sql`${UsersTable.handle} % ${searchTerm}`,
        sql`${UsersTable.email} % ${searchTerm}`,
        sql`${UsersTable.lastName} % ${searchTerm}`,
        sql`${UsersTable.firstName} % ${searchTerm}`
      )
    )
    .orderBy((table) => [
      desc(table.rank),
      desc(table.handle_similarity),
      desc(table.email_similarity),
      desc(table.last_name_similarity),
      desc(table.first_name_similarity),
    ]);
};
