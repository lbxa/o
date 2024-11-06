import baseConfig from "@ocorp/eslint/base";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**", "node_modules", ".sst"],
    files: ["*.config.*", "*.ts", "*.js"]
  },
  ...baseConfig,
];
