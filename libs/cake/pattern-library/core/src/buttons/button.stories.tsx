// containers.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import { PrimaryButton, SecondaryButton, TertiaryButton } from "./";

const meta: Meta<typeof PrimaryButton> = {
  component: PrimaryButton,
};

export default meta;
type Story = StoryObj<typeof PrimaryButton>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row items-center justify-center space-evenly">
      {children}
    </div>
  );
}

export const ButtonStory: Story = {
  render: () => {
    return (
      <div className="p-4">
        <div className="p-4">
          <h1>Light</h1>
          <div className="grid grid-cols-4 gap-3 items-center justify-center">
            <>
              <div></div>
              <div>Primary!</div>
              <div>Secondary</div>
              <div>Tertiary</div>
            </>
            <>
              <div>Default</div>
              <div>
                <PrimaryButton>Send</PrimaryButton>
              </div>
              <div>
                <SecondaryButton>Send</SecondaryButton>
              </div>
              <div>
                <TertiaryButton>Send</TertiaryButton>
              </div>
            </>
            <>
              <div>Hover</div>
              <div>
                <PrimaryButton simulateHover>Send</PrimaryButton>
              </div>
              <div>
                <SecondaryButton simulateHover>Send</SecondaryButton>
              </div>
              <div>
                <TertiaryButton simulateHover>Send</TertiaryButton>
              </div>
            </>
            <>
              <div>Active</div>
              <div>
                <PrimaryButton simulateActive>Send </PrimaryButton>
              </div>
              <div>
                <SecondaryButton simulateActive>Send</SecondaryButton>
              </div>
              <div>
                <TertiaryButton simulateActive>Send</TertiaryButton>
              </div>
            </>
            <>
              <div>Disabled</div>
              <div>
                <PrimaryButton disabled>Send</PrimaryButton>
              </div>
              <div>
                <SecondaryButton disabled>Send</SecondaryButton>
              </div>
              <div>
                <TertiaryButton disabled>Send</TertiaryButton>
              </div>
            </>
          </div>
        </div>
        <div className="p-4 darkSection">
          <h1>Dark</h1>
          <div className="grid grid-cols-4 gap-3 items-center justify-center">
            <>
              <div></div>
              <div>Primary</div>
              <div>Secondary</div>
              <div>Tertiary</div>
            </>
            <>
              <div>Default</div>
              <div>
                <PrimaryButton>Send</PrimaryButton>
              </div>
              <div>
                <SecondaryButton>Send</SecondaryButton>
              </div>
              <div>
                <TertiaryButton>Send</TertiaryButton>
              </div>
            </>
            <>
              <div>Hover</div>
              <div>
                <PrimaryButton>Send</PrimaryButton>
              </div>
              <div>
                <SecondaryButton>Send </SecondaryButton>
              </div>
              <div>
                <TertiaryButton>Send </TertiaryButton>
              </div>
            </>
            <>
              <div>Active</div>
              <div>
                <PrimaryButton>Send </PrimaryButton>
              </div>
              <div>
                <SecondaryButton>Send</SecondaryButton>
              </div>
              <div>
                <TertiaryButton>Send</TertiaryButton>
              </div>
            </>
            <>
              <div>Disabled</div>
              <div>
                <PrimaryButton disabled>Send</PrimaryButton>
              </div>
              <div>
                <SecondaryButton disabled>Send</SecondaryButton>
              </div>
              <div>
                <TertiaryButton disabled>Send</TertiaryButton>
              </div>
            </>
          </div>
        </div>
      </div>
    );
  },
};
