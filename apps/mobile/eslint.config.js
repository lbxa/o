import baseConfig from "@o/eslint/base";

/** @type {import('typescript-eslint').Config} */
export default [
  ...baseConfig,
  {
    settings: {
      tailwindcss: {
        config: "tailwind.config.ts",
      },
    },
  },
  {
    ignores: [
      "dist", 
      "node_modules", 
      ".expo", 
      "src/__generated__/**/*.ts",
      "ios",
      "android",
    ],
  }
];
