import type { CodegenConfig } from '@graphql-codegen/cli';
 
const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:6969/graphql',
  ignoreNoDocuments: true,
  documents: [
    'packages/*/src/**/*.graphql',
    'apps/*/src/**/*.{ts,tsx}',
  ],
  generates: {
    './packages/api/gql/': {
      preset: 'client'
    }
  },
  watch: true
};
 
export default config;