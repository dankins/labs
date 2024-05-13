"use client";
import {
  FormAction,
  FormState,
  Heading3,
  PrimaryButton,
  Text,
  TextInput,
} from "@danklabs/pattern-library/core";
import React, { useEffect, useRef, useState } from "react";
import { authenticateAction } from "../actions";
import { useFormState, useFormStatus } from "react-dom";

const EMAIL_ADDRESS_EXISTS = "form_identifier_exists";

const ERROR_EMAIL_EXISTS = "ERROR_EMAIL_EXISTS";

export type FirstFactorResult =
  | {
      status: "complete";
      createdSessionId: string;
    }
  | { status: "email_verification_sent" }
  | { status: "error"; error: typeof ERROR_EMAIL_EXISTS | any }
  | { status: "account_not_found" }
  | { status: "unknown" };

export type FirstFactorProps = {
  mode: "signin" | "signup";
  emailCta: string;
  startHeading: React.ReactNode;
  startParagraph: React.ReactNode;
  verifyCodeHeading: React.ReactNode;
  verifyCodeParagraph: React.ReactNode;
  alreadyLoggedInButton: React.ReactNode;
  socialRedirectUrl: string;
  defaultEmail?: string;
  firstName?: string;
  lastName?: string;
  newUserData?: any;
};

export function LoginShell({
  mode,
  emailCta,
  startHeading,
  startParagraph,
  verifyCodeHeading,
  verifyCodeParagraph,
  alreadyLoggedInButton,
  socialRedirectUrl,
  defaultEmail,
  firstName,
  lastName,
}: FirstFactorProps) {
  const [state, formAction] = useFormState(authenticateAction, {
    status: "start",
    mode,
  });
  return (
    <div>
      <form action={formAction}>
        {state.status === "start" && (
          <div className="flex flex-col gap-4">
            {startHeading}
            {startParagraph}
            <EmailVerification
              emailCta={emailCta}
              defaultEmail={defaultEmail}
              firstName={firstName}
              lastName={lastName}
            />
          </div>
        )}

        {state.error && <Text> {state.error}</Text>}
      </form>
    </div>
  );
}

function EmailVerification({
  defaultEmail,
  firstName,
  lastName,
  emailCta,
}: {
  defaultEmail?: string;
  firstName?: string;
  lastName?: string;
  emailCta: string;
}) {
  const formStatus = useFormStatus();
  return (
    <>
      <Heading3>
        {firstName} {lastName}
      </Heading3>
      <input type="hidden" name="firstName" value={firstName} />
      <input type="hidden" name="lastName" value={lastName} />
      <TextInput
        name="email"
        label="Email Address"
        defaultValue={defaultEmail}
      />
      <div className="self-center">
        <PrimaryButton type="submit" loading={formStatus.pending}>
          {emailCta}
        </PrimaryButton>
      </div>
    </>
  );
}
