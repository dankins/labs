// containers.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import { PageWithNavbar } from "./PageWithNavbar";

const meta: Meta<typeof PageWithNavbar> = {
  component: PageWithNavbar,
};

export default meta;
type Story = StoryObj<typeof PageWithNavbar>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

function NavBar() {
  return <div>nav nav nav</div>;
}

export const PageWithNavbarStory: Story = {
  render: () => (
    <PageWithNavbar navbar={<NavBar />}>ahoy mateys</PageWithNavbar>
  ),
};
