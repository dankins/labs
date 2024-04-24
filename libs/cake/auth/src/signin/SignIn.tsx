"use client";

import { useRouter } from "next/navigation";
import { LoginShell } from "../common/LoginShell";
import {
  Heading3,
  Heading4,
  Paragraph1,
  PrimaryButton,
} from "@danklabs/pattern-library/core";

const EMAIL_ADDRESS_EXISTS = "form_identifier_exists";
type signinStates = "first_factor" | "email_sent_signin";

export type SignInClientProps = {
  emailCta?: string;
  startHeading?: React.ReactNode;
  startParagraph?: React.ReactNode;
  verifyCodeHeading?: React.ReactNode;
  verifyCodeParagraph?: React.ReactNode;
  alreadyLoggedInButton?: React.ReactNode;
  defaultEmail?: string;
  redirectUrl: string;
  socialRedirectUrl?: string;
};

export function SignIn({
  emailCta = "Sign In",
  redirectUrl,
  startHeading = <Heading4>Verify My Account</Heading4>,
  startParagraph = (
    <Paragraph1>
      Enter email or sign in with your social account to continue.
    </Paragraph1>
  ),
  verifyCodeHeading = <Heading4>Verify Email Address</Heading4>,
  verifyCodeParagraph,
  alreadyLoggedInButton = (
    <PrimaryButton href="/collection">Continue to Collection</PrimaryButton>
  ),
  defaultEmail,
  socialRedirectUrl,
}: SignInClientProps) {
  const router = useRouter();

  function handleAuthenticated() {
    router.push(redirectUrl);
  }

  return (
    <LoginShell
      mode="signin"
      emailCta={emailCta}
      onAuthenticated={handleAuthenticated}
      startHeading={startHeading}
      startParagraph={startParagraph}
      verifyCodeHeading={verifyCodeHeading}
      verifyCodeParagraph={verifyCodeParagraph}
      alreadyLoggedInButton={alreadyLoggedInButton}
      defaultEmail={defaultEmail}
      socialRedirectUrl={socialRedirectUrl || redirectUrl}
    />
  );
}
