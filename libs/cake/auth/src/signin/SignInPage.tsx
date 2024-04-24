import { ClerkProvider } from "@clerk/nextjs";
import { SignIn } from "./SignIn";
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
          <div className="p-4">
            <SignIn
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
