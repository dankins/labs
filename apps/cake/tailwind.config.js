const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"
    ),
    ...createGlobPatternsForDependencies(__dirname),
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-inter)"],
      sansSerif: ["var(--font-inter)"],
      heading: ["var(--font-poppins)"],
      pizzaz: ["var(--font-montserrat)"],
      fancy: ["var(--font-fancy)"],
      readex: ["var(--font-readex)"],
    },
    extend: {
      aspectRatio: {
        wallet: "1.586 / 1",
      },
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "primary-content": "rgb(var(--color-primary-content) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        neutral: "rgb(var(--color-neutral) / <alpha-value>)",
        "neutral-content": "rgb(var(--color-neutral-content) / <alpha-value>)",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("@tailwindcss/typography")],
};
