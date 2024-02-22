"use client";
import z from "zod";
import { useAuth, useSignIn, useSignUp } from "@clerk/nextjs";
import { Button } from "@danklabs/pattern-library/core";
import { useMemo, useRef, useState } from "react";
import { useQueryStringUpdater } from "../util/searchParams";

export function AccountClient({
  createAccountWithVerifiedEmail,
}: {
  createAccountWithVerifiedEmail(formData: FormData): Promise<string>;
}) {
  const updateQueryString = useQueryStringUpdater();
  const { isLoaded: authIsLoaded, isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [verificationSent, setVerificationSent] = useState(false);

  useMemo(() => {
    if (isSignedIn) {
      updateQueryString("step", "address");
    }
  }, [isSignedIn]);

  async function formAction(formData: FormData) {
    if (!signIn) {
      return;
    }
    const ticket = await createAccountWithVerifiedEmail(formData);

    const result = await signIn.create({
      strategy: "ticket",
      ticket,
    });
    if (result.status === "complete") {
      console.log("successly logged in", result);
      setActive({ session: result.createdSessionId });
      return;
    }
  }

  if (isSignedIn) {
    return <div>you are signed in</div>;
  }

  if (verificationSent) {
    return (
      <div>
        <h1>enter your 5 digit code:</h1>
        <input
          type="text"
          name="verification"
          placeholder="Verification Code"
          required
        />
      </div>
    );
  }

  return (
    <form action={formAction}>
      <h1>Create Account</h1>
      <div className="flex flex-col gap-3 py-5">
        <input type="email" name="email" placeholder="Email Address" required />
      </div>

      <Button disabled={!isLoaded}>Create Account</Button>
    </form>
  );
}
