// containers.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import { AppShell } from "./AppShell";

const meta: Meta<typeof AppShell> = {
  component: AppShell,
};

export default meta;
type Story = StoryObj<typeof AppShell>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

export const AppShellStory: Story = {
  render: () => {
    return (
      <AppShell>
        <div>hello everyone</div>
      </AppShell>
    );
  },
};
