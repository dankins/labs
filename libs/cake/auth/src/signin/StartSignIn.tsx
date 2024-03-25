import {
  EmailIcon,
  GhostButton,
  Heading3,
  InstagramIcon,
  LoginFacebookIcon,
  LoginGoogleIcon,
  Paragraph1,
  PrimaryButton,
  TextInput,
} from "@danklabs/pattern-library/core";
import React, { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { validateFormData } from "@danklabs/utils";
import { z } from "zod";

export type FirstFactorProps = {
  heading?: React.ReactNode;
  paragraph?: React.ReactNode;
  onSuccess(result: { method: "email"; needsFirstFactor: boolean }): void;
};

export function StartSignIn({
  heading = <Heading3>Verify My Account</Heading3>,
  paragraph = (
    <Paragraph1>
      Enter your name and email or sign up with your social account to create
      your Cake account.
    </Paragraph1>
  ),
  onSuccess,
}: FirstFactorProps) {
  const { signIn, isLoaded: isSignInLoaded, setActive } = useSignIn();
  const [loading, setLoading] = useState(false);

  async function startFirstFactorEmail(formData: FormData) {
    console.log("starting sign in");
    if (!isSignInLoaded) {
      throw new Error("signIn not loaded");
    }
    const data = validateFormData(
      formData,
      z.object({
        email: z.string().email(),
      })
    );
    console.log("sign in email", data);

    try {
      const result = await signIn.create({ identifier: data.email });
      setActive({ session: result.createdSessionId });
      console.log("result is", result.status, result.identifier, result);
      if (result.status === "needs_first_factor") {
        await sendFirstFactor(result);
        onSuccess({ method: "email", needsFirstFactor: true });
      }
    } catch (err) {
      console.log("error with signin", (err as any).errors, err);
      throw err;
    }
  }
  async function sendFirstFactor(
    result: Awaited<
      ReturnType<NonNullable<ReturnType<typeof useSignIn>["signIn"]>["create"]>
    >
  ) {
    const firstFactor = result.supportedFirstFactors.find(
      (s) => s.strategy === "email_code"
    );
    if (!firstFactor || firstFactor.strategy !== "email_code") {
      throw new Error("email code not supported");
    }

    const firstFactorResult = await result.prepareFirstFactor(firstFactor);
    console.log(
      "firstFactorResult",
      firstFactorResult.status,
      firstFactorResult
    );
    firstFactorResult.status;
    // setSigninState("email_sent_signin");
  }

  async function startFirstFactorSocial(
    strategy: "oauth_facebook" | "oauth_google"
  ) {
    if (!isSignInLoaded || !signIn) {
      throw new Error("signIn not loaded");
    }
    const redirectUrl = "http://localhost:4300/collection";
    const redirectUrlComplete = redirectUrl;
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl,
      redirectUrlComplete,
    });
  }

  return (
    <div className="max-w-[425px] flex flex-col gap-4">
      <div>
        {heading}
        {paragraph}
      </div>
      <form action={startFirstFactorEmail} className="my-5">
        <TextInput
          icon={<EmailIcon />}
          name={"email"}
          label="Email"
          placeholder="Email Address"
          disabled={loading}
        />
        <div className="my-10 flex flex-row items-center justify-center">
          <PrimaryButton
            className="uppercase"
            type="submit"
            disabled={loading || !isSignInLoaded}
            loading={loading}
          >
            Sign In
          </PrimaryButton>
        </div>
      </form>
      <div>
        <div className="flex items-center">
          <span className="flex-1 border-t border-gray-300"></span>
          <span className="px-4 text-gray-600">or</span>
          <span className="flex-1 border-t border-gray-300"></span>
        </div>
        <div className="flex flex-row gap-3 items-center justify-center text-4xl">
          <form action={() => startFirstFactorSocial("oauth_facebook")}>
            <GhostButton
              background="black"
              className="rounded-full"
              disabled={loading || !isSignInLoaded}
              icon={<LoginFacebookIcon />}
            ></GhostButton>
          </form>
          <form action={() => startFirstFactorSocial("oauth_google")}>
            <GhostButton
              background="black"
              className="rounded-full"
              disabled={loading || !isSignInLoaded}
              icon={<LoginGoogleIcon />}
            ></GhostButton>
          </form>
        </div>
      </div>
    </div>
  );
}
