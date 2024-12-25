import type { Config } from "tailwindcss";
import defaultColors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      ...defaultColors,
    },
    extend: {
      colors: {
        ivory: {
          light: "#f4f8fb",
          DEFAULT: "#edf4f8",
          dark: "#4893af",
        },
        indigo: {
          light: "#e1e6fe",
          DEFAULT: "#5955eb",
          dark: "#37307f",
        },
        violet: {
          light: "#ede9fe",
          DEFAULT: "#a488f8",
          dark: "#4c1f93",
        },
        navy: {
          light: "#5849ff",
          DEFAULT: "#0c044d",
          dark: "#003366",
        },
        surface: {
          light: "#ffffff",
          dark: "#1e1e1e",
        },
      },
      spacing: {
        xs: "0.25rem", // 4px
        sm: "0.5rem", // 8px
        md: "1rem", // 16px
        lg: "1.5rem", // 24px
        xl: "2rem", // 32px
      },
    },
  },
  plugins: [],
} satisfies Config;
