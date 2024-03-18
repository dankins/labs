// text.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import { Paragraph } from "./Paragraph";

const meta: Meta<typeof Paragraph> = {
  component: Paragraph,
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Text: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-3">
      <Paragraph>Hello World</Paragraph>
    </div>
  ),
};
