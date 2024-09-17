import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xxs: { max: "359px" },
        // => @media (max-width: 359px) styles will apply to any screen up to 359px

        xs: { min: "360px" },
        // => @media (min-width: 360px) styles will apply from 360px and above.

        s: { min: "375px" },
        // => @media (min-width: 375px) styles will apply from 375px and above.

        sm: { min: "475px" },
        // => @media (min-width: 475px) styles will apply from 475px and above.

        md: { min: "640px" },
        // => @media (min-width: 640px) styles will apply from 640px and above.

        lg: { min: "768px" },
        // => @media (min-width: 768px) styles will apply from 768px and above.

        xl: { min: "1024px" },
        // => @media (min-width: 1024px) styles will apply from 1024x and above.

        "2xl": { min: "1280px" },
        // => @media (min-width: 1280px) styles will apply from 1280px and above.

        "3xl": { min: "1536px" },
        // => @media (min-width: 1536px) styles will apply from 1536px and above.
      },
      colors: {
        crimson: "#FF4136",
        sunrise: "#FF851B",
        sunny: "#FFDC00",
        emerald: "#2ECC40",
        azure: "#0074D9",
        velvet: "#B10DC9",
        skyblue: "#7FDBFF",
        rosy: "#FF69B4",
        gold: "#FFD700",
      },
    },
  },
  plugins: [],
};
export default config;
