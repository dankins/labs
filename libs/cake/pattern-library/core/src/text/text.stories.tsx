// text.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Paragraph1,
  Paragraph2,
  Paragraph3,
  Paragraph4,
} from "@danklabs/pattern-library/core";
import { apris, supreme } from "../fonts/loadFonts";

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
  render: () => {
    const paragraphCopy = `Getting dressed is just a moment in your day and so I understand why it’s easy to write it off as a thing that you have to check off your morning routine’s to-dos, but put-ting a little work into figuring out what suits you can in fact arm you with the confidence it takes to feel more fluid and free in your own skin.`;
    return (
      <div className={`${apris.variable} ${supreme.variable}`}>
        <div>
          <Heading1>
            The Coolest and Sweetest Women you Know Shop with Cake
          </Heading1>
          <Heading2>
            A Membership to Cake Comes with an Unheard of Level of Perks
          </Heading2>
          <Heading3>
            The Coolest and Sweetest Women you Know Shop with Cake
          </Heading3>
          <Heading4>Collection</Heading4>
        </div>
        <div>
          <Paragraph1>{paragraphCopy}</Paragraph1>
          <Paragraph2>{paragraphCopy}</Paragraph2>
          <Paragraph3>{paragraphCopy}</Paragraph3>
          <Paragraph4>{paragraphCopy}</Paragraph4>
          <p>normal copy</p>
          <div className={`${apris.className} ${supreme.className}`}></div>
        </div>
      </div>
    );
  },
};
