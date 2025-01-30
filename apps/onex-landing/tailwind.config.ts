import baseConfig from "@o/tailwind/base";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Times New Roman", ...defaultTheme.fontFamily.serif],
        sans: ["Neue Montreal", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'picasso': "url('assets/images/picasso.jpg')",
        'raphael': "url('assets/images/raphael.jpg')",
        'warhol': "url('assets/images/warhol-soup.jpg')",
        'monet': "url('assets/images/monet.jpg')",
        'lichtenstein': "url('assets/images/lichtenstein.jpg')"
      } 
    }
  }
} satisfies Config;