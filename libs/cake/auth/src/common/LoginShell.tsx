import {
  EmailIcon,
  GhostButton,
  Heading3,
  LoginFacebookIcon,
  LoginGoogleIcon,
  Paragraph1,
  Paragraph3,
  PrimaryButton,
  TextInput,
} from "@danklabs/pattern-library/core";
import React, { useState } from "react";
import { useAuth, useSignIn, useSignUp } from "@clerk/nextjs";
import { validateFormData } from "@danklabs/utils";
import { defaultErrorMap, z } from "zod";
import { CodeValidationResult, ValidateCode } from "./ValidateCode";
import { AlreadyLoggedIn } from "./AlreadyLoggedIn";

const EMAIL_ADDRESS_EXISTS = "form_identifier_exists";

const ERROR_EMAIL_EXISTS = "ERROR_EMAIL_EXISTS";

export type FirstFactorResult =
  | {
      status: "complete";
      createdSessionId: string;
    }
  | { status: "email_verification_sent" }
  | { status: "error"; error: typeof ERROR_EMAIL_EXISTS | any }
  | { status: "unknown" };

export type FirstFactorProps = {
  mode: "signin" | "signup";
  emailCta: string;
  startHeading?: React.ReactNode;
  startParagraph?: React.ReactNode;
  verifyCodeHeading?: React.ReactNode;
  verifyCodeParagraph?: React.ReactNode;
  alreadyLoggedInButton?: React.ReactNode;
  socialRedirectUrl?: string;
  defaultEmail?: string;
  onAuthenticated(): void;
};

export function LoginShell({
  mode,
  emailCta,
  startHeading = <Heading3>Verify My Account</Heading3>,
  startParagraph = (
    <Paragraph1>
      Enter your email or sign up with your social account to create your Cake
      account.
    </Paragraph1>
  ),
  verifyCodeHeading = (
    <h1 className="text-xl font-normal text-primary">Create Cake Account</h1>
  ),
  verifyCodeParagraph,
  alreadyLoggedInButton,
  socialRedirectUrl,
  defaultEmail,
  onAuthenticated,
}: FirstFactorProps) {
  const { isSignedIn } = useAuth();
  const { signIn, isLoaded: isSignInLoaded, setActive } = useSignIn();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [overrideMode, setOverrideMode] = useState<"signin" | "signup">();

  async function handleEmailSubmit(formData: FormData) {
    console.log("starting sign in");

    const data = validateFormData(
      formData,
      z.object({
        email: z.string().email(),
      })
    );
    console.log("sign in email", data);
    await startAuthentication(data.email);
  }

  async function startAuthentication(
    email: string,
    overrideMode?: "signin" | "signup"
  ) {
    setOverrideMode(overrideMode);
    setLoading(true);
    const result =
      mode === "signin" || overrideMode === "signin"
        ? await signInEmail(email)
        : await signUpEmail(email);

    if (result.status === "email_verification_sent") {
      setVerifyEmail(true);
    } else if (result.status === "error") {
      console.log("authentication error", result.error);
      if (result.error === ERROR_EMAIL_EXISTS) {
        return startAuthentication(email, "signin");
      } else setError("Error logging in");
    }

    setLoading(false);
  }

  async function signUpEmail(email: string): Promise<FirstFactorResult> {
    if (!isSignUpLoaded) {
      throw new Error("signIn not loaded");
    }

    try {
      const signUpResult = await signUp.create({
        emailAddress: email,
      });

      if (signUpResult.status === "complete") {
        return {
          status: "complete",
          createdSessionId: signUpResult.createdSessionId!,
        };
      }

      console.log("signup result is", signUpResult);
      if (signUpResult.status === "missing_requirements") {
        const verificationResult =
          await signUpResult.prepareEmailAddressVerification({
            strategy: "email_code",
          });
        console.log("verification result is", verificationResult);
        return {
          status: "email_verification_sent",
        };
      }
    } catch (err) {
      const error = (err as any).errors[0];
      if (error.code === EMAIL_ADDRESS_EXISTS) {
        return {
          status: "error",
          error: ERROR_EMAIL_EXISTS,
        };
      } else {
        console.log("signup error", (err as any).errors, err);
        return {
          status: "error",
          error: err,
        };
      }
    }

    return { status: "unknown" };
  }

  async function signInEmail(email: string): Promise<FirstFactorResult> {
    if (!isSignInLoaded) {
      throw new Error("signIn not loaded");
    }

    try {
      const result = await signIn.create({ identifier: email });
      if (result.createdSessionId) {
        return {
          status: "complete",
          createdSessionId: result.createdSessionId,
        };
      }
      if (result.status === "needs_first_factor") {
        await sendFirstFactor(result);
        return {
          status: "email_verification_sent",
        };
      }
      return { status: "unknown" };
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

  async function authenticateSocial(
    strategy: "oauth_facebook" | "oauth_google"
  ) {
    if (mode === "signin" || overrideMode === "signin") {
      signInSocial(strategy);
    } else {
      signUpSocial(strategy);
    }
  }

  async function signInSocial(strategy: "oauth_facebook" | "oauth_google") {
    if (!isSignInLoaded || !signIn) {
      throw new Error("signIn not loaded");
    }
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: socialRedirectUrl!,
      redirectUrlComplete: socialRedirectUrl!,
    });
  }
  async function signUpSocial(strategy: "oauth_facebook" | "oauth_google") {
    if (!signUp) {
      throw new Error("signIn not loaded");
    }
    return signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: socialRedirectUrl!,
      redirectUrlComplete: socialRedirectUrl!,
    });
  }

  async function handleCodeEntered(code: string) {
    if (!signIn) {
      throw new Error("signup not loaded");
    }
    setError(undefined);
    setLoading(true);

    try {
      if (mode === "signin" || overrideMode === "signin") {
        await handleSignInFirstFactor(code);
      } else {
        await handleSignUpVerifyEmail(code);
      }

      onAuthenticated();
    } catch (err) {
      console.error(err);
      setError("Invalid code - please double check and try again.");
    }
    setLoading(false);
  }
  async function handleSignUpVerifyEmail(code: string) {
    if (!signUp || !setActive) {
      throw new Error("signIn not loaded");
    }

    const result = await signUp.attemptEmailAddressVerification({
      // @ts-ignore - this is throwing an error but confirm it works
      strategy: "email_code",
      code,
    });
    console.log("status", result.status, result);
    await setActive({ session: result.createdSessionId });
    onAuthenticated();
  }
  async function handleSignInFirstFactor(code: string) {
    if (!signIn || !setActive) {
      throw new Error("signIn not loaded");
    }

    const result = await signIn.attemptFirstFactor({
      strategy: "email_code",
      code,
    });
    console.log("status", result.status, result);
    await setActive({ session: result.createdSessionId });
    onAuthenticated();
  }

  if (isSignedIn && !loading) {
    return <AlreadyLoggedIn primaryCta={alreadyLoggedInButton} />;
  }

  if (verifyEmail) {
    return (
      <ValidateCode
        onCodeEntered={handleCodeEntered}
        heading={verifyCodeHeading}
        paragraph={verifyCodeParagraph}
        error={error}
        loading={loading}
      />
    );
  }

  return (
    <div className="max-w-[425px] flex flex-col gap-4">
      <div>
        {startHeading}
        {startParagraph}
      </div>
      <form action={handleEmailSubmit} className="my-5">
        <TextInput
          icon={<EmailIcon />}
          name={"email"}
          label="Email"
          placeholder="Email Address"
          disabled={loading}
          defaultValue={defaultEmail}
          required
        />
        {error && (
          <Paragraph3 className="mt-3 text-secondary">{error}</Paragraph3>
        )}
        <div className="my-10 flex flex-row items-center justify-center">
          <PrimaryButton
            className="uppercase"
            type="submit"
            disabled={loading || !isSignInLoaded}
            loading={loading}
          >
            {emailCta}
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
          <form action={() => authenticateSocial("oauth_facebook")}>
            <GhostButton
              background="black"
              className="rounded-full"
              disabled={loading || !isSignInLoaded}
              icon={<LoginFacebookIcon />}
            ></GhostButton>
          </form>
          <form action={() => authenticateSocial("oauth_google")}>
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
