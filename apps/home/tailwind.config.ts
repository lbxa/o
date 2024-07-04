import baseConfig from "@o/tailwind/native";
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [baseConfig],
} satisfies Config;