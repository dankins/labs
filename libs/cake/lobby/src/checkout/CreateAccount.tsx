"use client";
import { z } from "zod";
import { useSignIn, useSignUp, useUser, useAuth } from "@clerk/nextjs";
import {
  TextInput,
  Button,
  EmailIcon,
  UserIcon,
} from "@danklabs/pattern-library/core";
import { useState } from "react";
import { LinkToStepButton } from "../LinkToStepButton";
import { useQueryStringUpdater } from "../util/searchParams";

const EMAIL_ADDRESS_EXISTS = "form_identifier_exists";

type signinStates = "initial" | "email_sent_signin" | "email_verification_sent";

export function CreateAccount() {
  const { signOut } = useAuth();
  const updateQueryString = useQueryStringUpdater();
  const { isSignedIn, user, isLoaded: isUserLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const [signinState, setSigninState] = useState<signinStates>("initial");
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();

  async function handleSubmit(formData: FormData) {
    if (!signUp) {
      throw new Error("signup not loaded");
    }
    setLoading(true);
    const form = Object.fromEntries(formData.entries());
    const createAccountSchema = z.object({
      email: z.string(),
      firstName: z.string(),
      lastName: z.string(),
    });
    const data = createAccountSchema.parse(form);
    console.log("form data", data);

    // Check the sign up response to
    // decide what to do next.
    try {
      const signUpResult = await signUp.create({
        emailAddress: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      if (signUpResult.status === "complete") {
        console.log(signUpResult);
        setActive({ session: signUpResult.createdSessionId });
        setLoading(false);
      }

      console.log("signup result is", signUpResult);
      if (signUpResult.status === "missing_requirements") {
        const verificationResult =
          await signUpResult.prepareEmailAddressVerification({
            strategy: "email_code",
          });
        console.log("verification result is", verificationResult);
        setSigninState("email_verification_sent");
      }
    } catch (err) {
      const error = (err as any).errors[0];
      if (error.code === EMAIL_ADDRESS_EXISTS) {
        console.log("email address already exists");
        await handleSignIn(data.email);
      } else {
        console.log("signup error", (err as any).errors, err);
      }
    }

    setLoading(false);
  }

  async function sendFirstFactor(
    result: Awaited<
      ReturnType<NonNullable<ReturnType<typeof useSignIn>["signIn"]>["create"]>
    >
  ) {
    // result.attemptFirstFactor({})
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
    setSigninState("email_sent_signin");
  }

  async function handleSignIn(emailAddress: string) {
    console.log("signing in", emailAddress);
    if (!signIn || !setActive) {
      throw new Error("signin not loaded");
    }

    try {
      const result = await signIn.create({ identifier: emailAddress });
      setActive({ session: result.createdSessionId });
      console.log("result is", result.status, result.identifier, result);
      if (result.status === "needs_first_factor") {
        sendFirstFactor(result);
      }
    } catch (err) {
      console.log("error with signin", (err as any).errors, err);
      throw err;
    }
  }

  async function handleCodeSubmit(formData: FormData) {
    if (!signUp || !signIn) {
      throw new Error("signup not loaded");
    }
    setLoading(true);
    const form = Object.fromEntries(formData.entries());
    const createAccountSchema = z.object({
      code: z.string(),
    });
    const data = createAccountSchema.parse(form);
    console.log("code", data.code);
    if (signinState === "email_sent_signin") {
      await handleSignInFirstFactor(data.code);
    } else {
      await handleSignUpVerifyEmail(data.code);
    }

    setLoading(false);
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
    updateQueryString("step", "checkout");
  }

  if (isSignedIn && signinState !== "email_sent_signin") {
    return (
      <div>
        <p>
          You are currently signed in as {user.emailAddresses[0].emailAddress}
        </p>
        <div className="flex flex-row justify-center gap-4 my-5">
          <div>
            <LinkToStepButton step="checkout">Continue</LinkToStepButton>
          </div>
          <div>
            <Button
              background="transparent"
              textColor="white"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (
    signinState === "email_sent_signin" ||
    signinState === "email_verification_sent"
  ) {
    return (
      <form className="p-4 w-full h-full" action={handleCodeSubmit}>
        <h1 className="text-xl font-normal text-primary">
          Create Cake Account
        </h1>
        <p>
          Enter your name and email or some other helper text if we need it.
        </p>
        <div>
          <TextInput
            name="code"
            label="Code"
            placeholder="Code"
            icon={<UserIcon className="fill-black" />}
          />
        </div>
        <Button
          background="white"
          className="uppercase font-poppins"
          type="submit"
          disabled={!isLoaded || loading}
        >
          Submit
        </Button>
      </form>
    );
  }

  return (
    <form className="p-4 w-full h-full" action={handleSubmit}>
      <h1 className="text-xl font-normal text-primary">Create Cake Account</h1>
      <p>Enter your name and email or some other helper text if we need it.</p>
      <div className="my-5 flex flex-col gap-4">
        <div className="flex flex-row gap-3">
          <TextInput
            name="firstName"
            label="First Name"
            placeholder="First Name"
            icon={<UserIcon className="fill-black" />}
          />{" "}
          <TextInput
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
            icon={<UserIcon className="fill-black" />}
          />
        </div>

        <TextInput
          name="email"
          label="Email Address"
          placeholder="Email Address"
          icon={<EmailIcon className="fill-black" />}
        />
      </div>
      <Button
        background="white"
        className="uppercase font-poppins"
        type="submit"
        disabled={!isLoaded || loading}
      >
        Create Account
      </Button>
    </form>
  );
}
