import { SignIn } from "@clerk/nextjs";
import { Centered, PageContent } from "@danklabs/pattern-library/core";

export default function Page() {
  return (
    <PageContent>
      <Centered>
        <SignIn />
      </Centered>
    </PageContent>
  );
}
