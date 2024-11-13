import type { CodegenConfig } from "@graphql-codegen/cli";

// relative paths are based on the working directory of
// the issued command, not the root of the project
const config = {
  overwrite: true,
  schema: "http://localhost:6969/graphql",
  ignoreNoDocuments: true,
  watch: true,
  // only execute codegen on specific subset of files
  // to avoid unnecessary re-generation
  documents: ["../api/src/**/*.graphql"],
  generates: {
    "./gql/types.ts": {
      plugins: ["typescript"],
    },
    "./schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
        scalars: {
          DateTime: "Date",
        },
      },
    },
  },
} satisfies CodegenConfig;

export default config;
