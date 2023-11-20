import { Centered, PageContent } from "@danklabs/pattern-library/core";
import { DankbotChat } from "@danklabs/laboratory/dankbot";

export default async function Page() {
  return (
    <PageContent>
      <Centered>
        <div className="container">
          <DankbotChat />
        </div>
      </Centered>
    </PageContent>
  );
}
