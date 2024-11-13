/* eslint-disable @stylistic/js/max-len */
import type * as schema from "@o/db";
import { UsersTable } from "@o/db";
import { or, sql } from "drizzle-orm";

import type { DbService } from "../../db/db.service";
import { encodeGlobalId } from "../../utils";

/**
 * Performs a full-text search on the users table across multiple fields.
 *
 * This function searches the handle, email, and full name fields of the users table
 * using MySQL's FULLTEXT search capabilities. It returns ranked results based on
 * relevance scores calculated for each field.
 *
 * @description
 * The function uses Boolean mode for the FULLTEXT search, automatically prefixing
 * the search term with '+' and suffixing it with '*' to match words starting with
 * the search term.
 *
 * Results are ordered based on the following criteria:
 * 1. Matches in the handle field (highest priority)
 * 2. Matches in the email field
 * 3. Matches in the full name field
 * 4. Any other matches (lowest priority)
 *
 * For ties, results are further ordered by the relevance scores (scoreHandle,
 * scoreEmail, scoreFullName) in descending order.
 *
 * @example
 * const dbService = new DbService();
 * const searchResults = await fullTextSearch(dbService, "john");
 * console.log(searchResults);
 *
 * @throws {Error} If there's an issue with the database connection or query execution.
 *
 * @note Ensure that FULLTEXT indexes are created on the handle, email, and full_name
 * columns of the users table for optimal performance.
 *   CREATE FULLTEXT INDEX idx_handle ON users(handle);
 *   CREATE FULLTEXT INDEX idx_email ON users(email);
 *   CREATE FULLTEXT INDEX idx_full_name ON users(full_name);
 *
 * @note For large datasets, consider implementing pagination to limit the number
 * of returned results.
 */

//   SELECT
//     id,
//     email,
//     handle,
//     full_name,
//     first_name,
//     last_name,
//     MATCH(handle) AGAINST(CONCAT('+', @search_term, '*') IN BOOLEAN MODE) AS score_handle,
//     MATCH(email) AGAINST(CONCAT('+', @search_term, '*') IN BOOLEAN MODE) AS score_email,
//     MATCH(full_name) AGAINST(CONCAT('+', @search_term, '*') IN BOOLEAN MODE) AS score_full_name
//   FROM users
//   WHERE
//     MATCH(handle) AGAINST(CONCAT('+', @search_term, '*') IN BOOLEAN MODE)
//     OR MATCH(email) AGAINST(CONCAT('+', @search_term, '*') IN BOOLEAN MODE)
//     OR MATCH(full_name) AGAINST(CONCAT('+', @search_term, '*') IN BOOLEAN MODE)
//   ORDER BY
//     CASE
//       WHEN MATCH(handle) AGAINST(CONCAT('+', @search_term, '*') IN BOOLEAN MODE) THEN 1
//       WHEN MATCH(email) AGAINST(CONCAT('+', @search_term, '*') IN BOOLEAN MODE) THEN 2
//       WHEN MATCH(full_name) AGAINST(CONCAT('+', @search_term, '*') IN BOOLEAN MODE) THEN 3
//       ELSE 4
//     END,
//     score_handle DESC,
//     score_email DESC,
//     score_full_name DESC;

export const fullTextSearch = async (
  dbService: DbService<typeof schema>,
  searchTerm: string
) => {
  const matchExpression = (field: string) =>
    sql`MATCH(${sql.raw(field)}) AGAINST(CONCAT('+', ${searchTerm}, '*') IN BOOLEAN MODE)`;

  const results = await dbService.db
    .select({
      id: UsersTable.id,
      email: UsersTable.email,
      handle: UsersTable.handle,
      fullName: UsersTable.fullName,
      firstName: UsersTable.firstName,
      lastName: UsersTable.lastName,
      scoreHandle: matchExpression("handle").as("score_handle"),
      scoreEmail: matchExpression("email").as("score_email"),
      scoreFullName: matchExpression("full_name").as("score_full_name"),
    })
    .from(UsersTable)
    .where(
      or(
        matchExpression("handle"),
        matchExpression("email"),
        matchExpression("full_name")
      )
    )
    .orderBy(
      sql`
      CASE
        WHEN ${matchExpression("handle")} THEN 1
        WHEN ${matchExpression("email")} THEN 2
        WHEN ${matchExpression("full_name")} THEN 3
        ELSE 4
      END,
      score_handle DESC,
      score_email DESC,
      score_full_name DESC
      `
    );

  return results.map((row) => ({
    ...row,
    id: encodeGlobalId("User", row.id),
  }));
};
