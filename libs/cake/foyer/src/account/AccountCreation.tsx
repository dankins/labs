import { Heading3, PrimaryButton, Text } from "@danklabs/pattern-library/core";
import { onSignupSuccess } from "../actions";
import { LoginShell } from "@danklabs/cake/auth";

export type AccountCreationProps = {
  providedEmail?: string;
  firstName: string;
  lastName: string;
};

export async function AccountCreation({
  providedEmail,
  firstName,
  lastName,
}: AccountCreationProps) {
  return (
    <LoginShell
      onAuthenticated={onSignupSuccess}
      mode="signup"
      startHeading={<Heading3>Welcome to CAKE!</Heading3>}
      startParagraph={
        <Text>
          Let's finish setting up your account. We'll send you an 6 digit code
          to verify for your email, or authenticate using a social provider.
        </Text>
      }
      emailCta="Send Email Verification"
      defaultEmail={providedEmail}
      socialRedirectUrl="/invitation?step=post-checkout"
      firstName={firstName}
      lastName={lastName}
      alreadyLoggedInButton={
        <PrimaryButton href={"/invitation?step=profile"}>
          Continue
        </PrimaryButton>
      }
    />
  );
}
