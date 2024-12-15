import type { Config } from "tailwindcss";

import baseConfig from "./base";

export default {
  darkMode: "class",
  content: baseConfig.content,
  presets: [baseConfig],
} satisfies Config;
