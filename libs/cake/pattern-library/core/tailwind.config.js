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
      h1: ["var(--font-h1)"],
      h2: ["var(--font-h2)"],
      h3: ["var(--font-h3)"],
      h4: ["var(--font-h4)"],
    },
    extend: {
      aspectRatio: {
        wallet: "1.586 / 1",
      },
      colors: {
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
