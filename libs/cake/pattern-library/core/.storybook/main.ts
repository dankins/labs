import { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  // addons: ["@storybook/addon-essentials", "@nx/react/plugins/storybook"],
  framework: "@storybook/nextjs",
  webpackFinal: async (config, { configType }) => {
    // if (configType === "DEVELOPMENT") {
    //   // Modify config for development
    // }
    // if (configType === "PRODUCTION") {
    //   // Modify config for production
    // }
    config.resolve!.fallback = { zlib: false, stream: false, fs: false };
    return config;
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
