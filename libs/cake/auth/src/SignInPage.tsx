import { ClerkProvider, clerkClient } from "@clerk/nextjs";
import { SignInClient } from "./SignInClient";
import { Centered, PageContent } from "@danklabs/pattern-library/core";

export async function SignInPage() {
  return (
    <ClerkProvider>
      <PageContent>
        <Centered>
          <div className="max-w-[400px]">
            <SignInClient
              verifyCodeHeading="Verify Code"
              redirectUrl="/collection"
            />
          </div>
        </Centered>
      </PageContent>
    </ClerkProvider>
  );
}
