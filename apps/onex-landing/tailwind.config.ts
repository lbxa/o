import baseConfig from "@o/tailwind/base";
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [baseConfig],
  theme: {
    extend: {
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