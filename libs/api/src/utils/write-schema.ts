import type { INestApplication } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { GraphQLSchemaHost } from "@nestjs/graphql";
import { writeFileSync } from "fs";
import { printSchema } from "graphql";
import { join, resolve } from "path";

/**
 * Manually write the schema file in development to avoid
 * the need for other codegen tools.
 */
export const writeSchema = (app: INestApplication) => {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "local"
  ) {
    const gqlSchemaHost = app.get(GraphQLSchemaHost);
    // this will be running from dist package
    const projectRoot = resolve(__dirname, "..");
    const schemaPath = join(projectRoot, "schema.graphql");
    try {
      writeFileSync(schemaPath, printSchema(gqlSchemaHost.schema));
      Logger.log(`Schema file written successfully to ${schemaPath}`);
    } catch (error) {
      Logger.error("Error writing schema file:", error);
    }
  }
};
