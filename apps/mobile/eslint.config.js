import baseConfig from "@o/eslint/base";

/** @type {import('typescript-eslint').Config} */
export default [
  ...baseConfig,
  {
    // https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/241#issuecomment-1537851714
    settings: {
      tailwindcss: {
        config: "tailwind.config.ts",
      },
    },
    ignores: [
      "dist/**", 
      "node_modules", 
      "./expo/**", 
      "src/__generated__/**",
      ".expo/types/router.d.ts"
    ],
  },
];
