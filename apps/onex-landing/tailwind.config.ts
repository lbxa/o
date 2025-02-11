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
      },
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'marquee-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        'marquee-left': 'marquee-left 100s linear infinite',
        'marquee-right': 'marquee-right 100s linear infinite'
      }
    }
  }
} satisfies Config;