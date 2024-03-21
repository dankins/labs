import { ClerkProvider, SignIn } from "@clerk/nextjs";
import { Centered, PageContent } from "@danklabs/pattern-library/core";

export default function Page() {
  return (
    <ClerkProvider>
      <PageContent>
        <Centered>
          <SignIn redirectUrl={"/collection"} />
        </Centered>
      </PageContent>
    </ClerkProvider>
  );
}
