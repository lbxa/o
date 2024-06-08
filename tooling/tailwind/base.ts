import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        xs: '0.25rem', // 4px
        sm: '0.5rem',  // 8px
        md: '1rem',    // 16px
        lg: '1.5rem',  // 24px
        xl: '2rem',    // 32px
      },
    },
  },
  plugins: [],
} satisfies Config;

