// text.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import { Heading1, Heading2, Heading3, Heading4 } from "./Heading";
import { Paragraph1, Paragraph2, Paragraph3, Paragraph4 } from "./Paragraph";

const meta: Meta<typeof Paragraph1> = {
  component: Paragraph1,
};

export default meta;
type Story = StoryObj<typeof Paragraph1>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Text: Story = {
  render() {
    return <div>fix me</div>;
  },
};
