import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gereralSans: ['var(--font-gereralSans)'],
        sfProDisplay: ['var(--font-sfProDisplay)'],
      }
    },
  },
  plugins: [
    // (addUtilities: PluginFunction) => {
    //   const newUtilities = {
    //     ".text-dot-end": {
    //       display: "-webkit-box",
    //       "-webkit-box-orient": "vertical",
    //       overflow: "hidden",
    //       "-webkit-line-clamp": 3,
    //     },
    //   };
    //   addUtilities(newUtilities);
    // },
  ],
};
export default config;
