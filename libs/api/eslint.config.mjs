import baseConfig from "@o/eslint/base"

/** @type {import('typescript-eslint').Config} */
export default [
  ...baseConfig,
  {
    ignores: ["dist/**", "node_modules", "src/types/graphql.ts"],
  },
  {
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
    }
  }
]