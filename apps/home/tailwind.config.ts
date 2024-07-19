import baseConfig from "@o/tailwind/native";
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [baseConfig],
  theme: {
    extend: {
      backgroundImage: {
        'picasso': "url('assets/images/picasso.jpg')",
        'raphael': "url('assets/images/raphael.jpg')",
        'warhol': "url('assets/images/warhol-soup.jpg')"
      }
    }
  }
} satisfies Config;