import { Centered, FullPage } from "@danklabs/pattern-library/core";
import { ActionPanel } from "./dankbot/ActionPanel";
import { DankbotChat } from "@danklabs/laboratory/dankbot";
import { AnimatedLogo } from "./AnimatedLogo";

export default async function Page() {
  return (
    <FullPage>
      <Centered>
        <AnimatedLogo height={400} width={400} />
      </Centered>
    </FullPage>
  );
}
