import baseConfig from "@o/eslint/base";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**", "node_modules"],
  },
  ...baseConfig,
];
