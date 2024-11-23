import baseConfig from "@o/eslint/base"

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**", "node_modules", "src/types/graphql.ts"],
  },
  ...baseConfig,
  {
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
    }
  }
]