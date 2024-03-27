import { useAuth, useUser } from "@clerk/nextjs";
import { PrimaryButton, SecondaryButton } from "@danklabs/pattern-library/core";

export function AlreadyLoggedIn({
  primaryCta,
}: {
  primaryCta?: React.ReactNode;
}) {
  const { signOut } = useAuth();
  const { isSignedIn, user, isLoaded: isUserLoaded } = useUser();
  if (!isUserLoaded || !user) {
    return null;
  }
  return (
    <div>
      <p>
        You are currently signed in as {user.emailAddresses[0].emailAddress}
      </p>
      <div className="flex flex-row justify-center gap-4 my-5">
        {primaryCta}
        <div>
          <SecondaryButton onClick={() => signOut()}>Sign Out</SecondaryButton>
        </div>
      </div>
    </div>
  );
}
