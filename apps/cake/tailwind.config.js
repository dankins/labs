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
      serif: ["var(--font-apris)"],
      sansSerif: ["var(--font-supreme)"],
      cursive: ["var(--font-selva)"],

      apris: ["var(--font-apris)"],
      supreme: ["var(--font-supreme)"],
      selva: ["var(--font-selva)"],
    },
    extend: {
      borderRadius: {
        DEFAULT: "2px",
      },
      aspectRatio: {
        wallet: "1.586 / 1",
      },
      colors: {
        "button-active": "rgb(var(--color-button-active) / <alpha-value>)",
        "button-active-content":
          "rgb(var(--color-button-active-content) / <alpha-value>)",
        dark: "rgb(var(--color-dark) / <alpha-value>)",
        "dark-content": "rgb(var(--color-dark-content) / <alpha-value>)",
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
