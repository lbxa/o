import type { CodegenConfig } from '@graphql-codegen/cli';
 
const config: CodegenConfig = {
  overwrite: true,
  // schema: 'http://localhost:6969/graphql',
  schema: '../backend/**/*.graphql',
  emitLegacyCommonJSImports: false,
  generates: {
    './src/gql/': {
      preset: 'client'
    }
  },
  watch: true
};
 
export default config;