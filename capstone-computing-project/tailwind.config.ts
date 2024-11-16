import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.svg",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      imageRendering: {
        crisp: 'crisp-edges',
        pixel: 'pixelated',
        optimize: '-webkit-optimize-contrast', 
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".image-rendering-crisp": {
          "image-rendering": "crisp-edges",
        },
        ".image-rendering-pixel": {
          "image-rendering": "pixelated",
        },
        ".image-rendering-optimize": {
          "image-rendering": "-webkit-optimize-contrast",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
export default config;