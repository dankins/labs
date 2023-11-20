import { Centered, FullPage } from "@danklabs/pattern-library/core";
import { ActionPanel } from "./ActionPanel";
import { DankbotChat } from "@danklabs/laboratory/dankbot";

export default async function Page() {
  return (
    <FullPage>
      <Centered>
        <div className="container">
          <DankbotChat />
        </div>
      </Centered>
    </FullPage>
  );
}
