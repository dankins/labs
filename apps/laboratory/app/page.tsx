import { Centered, FullPage } from "@danklabs/pattern-library/core";
import { ActionPanel } from "./dankbot/ActionPanel";
import { DankbotChat } from "@danklabs/laboratory/dankbot";

export default async function Page() {
  return (
    <FullPage>
      <Centered>
        <div>hello world</div>
      </Centered>
    </FullPage>
  );
}
