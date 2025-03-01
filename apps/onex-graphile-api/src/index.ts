import "graphile-config";
import "postgraphile";

import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { execute, hookArgs } from "grafast";
import type { DocumentNode, ExecutionResult } from "grafast/graphql";
import { validate } from "grafast/graphql";
import pg from "pg";
import { postgraphile } from "postgraphile";
import { makePgService } from "postgraphile/adaptors/pg";
import { PostGraphileAmberPreset } from "postgraphile/presets/amber";
import { gql } from "postgraphile/utils";

const pool = new pg.Pool({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

const preset: GraphileConfig.Preset = {
  extends: [PostGraphileAmberPreset],
  plugins: [],
  grafast: {},
  pgServices: [
    makePgService({
      pool,
    }),
  ],
};

const pgl = postgraphile(preset);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function executeDocument<TData = any, TVariables = any>(
  requestContext: Partial<Grafast.RequestContext>,
  document: DocumentNode | TypedDocumentNode<TData, TVariables>,
  variableValues?: Record<string, unknown> | null,
  operationName?: string
): Promise<ExecutionResult<TData, TVariables>> {
  const { schema, resolvedPreset } = await pgl.getSchemaResult();

  // Validate the GraphQL document against the schema:
  const errors = validate(schema, document);
  if (errors.length > 0) {
    return { errors };
  }

  // Prepare the execution arguments:
  const args = await hookArgs({
    schema,
    document,
    variableValues,
    operationName,
    resolvedPreset,
    requestContext,
  });

  // Execute the request using Grafast:
  const result = await execute(args);

  // Cast the result to the types implied by the TypedDocumentNode:
  return result as ExecutionResult<TData, TVariables>;
}

const results = await executeDocument(
  {},
  gql`
    query {
      viewer {
        id
      }
    }
  `,
  {},
  "viewer"
);

console.log(results);
