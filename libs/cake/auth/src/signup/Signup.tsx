"use client";

import { LoginShell } from "../common/LoginShell";
import { Heading3, Paragraph1 } from "@danklabs/pattern-library/core";

type signupStates = "first_factor" | "email_sent_signin";

export type SignupProps = {
  emailCta?: string;
  startHeading?: React.ReactNode;
  startParagraph?: React.ReactNode;
  verifyCodeHeading?: React.ReactNode;
  verifyCodeParagraph?: React.ReactNode;
  alreadyLoggedInButton?: React.ReactNode;
  socialRedirectUrl: string;
  defaultEmail?: string;

  onSignUpSuccess?(): void;
};
export function Signup({
  emailCta = "Create Account",
  startHeading = <Heading3>Create Account</Heading3>,
  startParagraph = (
    <Paragraph1>
      Enter your email or sign up with your social account to create your Cake
      account.
    </Paragraph1>
  ),
  verifyCodeHeading = (
    <h1 className="text-xl font-normal text-primary">Create Cake Account</h1>
  ),
  alreadyLoggedInButton,
  verifyCodeParagraph,
  socialRedirectUrl,
  defaultEmail,
  onSignUpSuccess,
}: SignupProps) {
  function handleAuthenticated() {
    console.log("onValidateCodeSuccess");
    onSignUpSuccess && onSignUpSuccess();
  }

  return (
    <LoginShell
      mode="signup"
      emailCta={emailCta}
      onAuthenticated={handleAuthenticated}
      startHeading={startHeading}
      startParagraph={startParagraph}
      verifyCodeHeading={verifyCodeHeading}
      verifyCodeParagraph={verifyCodeParagraph}
      alreadyLoggedInButton={alreadyLoggedInButton}
      socialRedirectUrl={socialRedirectUrl}
      defaultEmail={defaultEmail}
    />
  );
}
