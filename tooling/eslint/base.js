/// <reference types="./types.d.ts" />

import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";
import drizzlePlugin from "eslint-plugin-drizzle"
import stylisticTs from '@stylistic/eslint-plugin-ts'
import stylisticJs from '@stylistic/eslint-plugin-js'
import prettierPlugin from "eslint-plugin-prettier";
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tailwind from "eslint-plugin-tailwindcss";

export default tseslint.config(
  {
    // Globally ignored files
    ignores: ["**/*.config.*", "node_modules/**"],
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      import: importPlugin,
      '@stylistic/ts': stylisticTs,
      '@stylistic/js': stylisticJs,
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      drizzle: drizzlePlugin,
      'react-hooks': reactHooksPlugin
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      ...tailwind.configs["flat/recommended"]
    ],
    rules: {
      "prettier/prettier": ["error", {
        singleQuote: false,
        trailingComma: "es5",
        bracketSpacing: true,
        jsxBracketSameLine: false,
        tabWidth: 2,
        semi: true,
        useTabs: false
      }],
      "@stylistic/js/max-len": [
        "error", { 
          "code": 80, 
          "ignoreComments": true, 
          "ignorePattern": "^import\\s.+\\sfrom\\s.+;$",
          "ignoreStrings": true
        } 
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/no-misused-promises": [
        2,
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/no-unnecessary-condition": [
        "warn",
        {
          allowConstantLoopConditions: true,
        },
      ],
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true
        },
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'drizzle/enforce-delete-with-where': "error",
      'drizzle/enforce-update-with-where': "error",
      ...reactHooksPlugin.configs.recommended.rules
    },
  },
  {
    linterOptions: { reportUnusedDisableDirectives: true },
    languageOptions: { parserOptions: { project: true } },
  },
);