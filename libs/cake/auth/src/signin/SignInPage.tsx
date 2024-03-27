import { ClerkProvider } from "@clerk/nextjs";
import { SignInClient } from "./SignInClient";
import { Centered, PageContent } from "@danklabs/pattern-library/core";

export async function SignInPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <ClerkProvider>
      <PageContent>
        <Centered>
          <div className="max-w-[400px]">
            <SignInClient
              verifyCodeHeading="Verify Code"
              redirectUrl={
                (searchParams["redirect_url"] as string) || "/collection"
              }
            />
          </div>
        </Centered>
      </PageContent>
    </ClerkProvider>
  );
}
