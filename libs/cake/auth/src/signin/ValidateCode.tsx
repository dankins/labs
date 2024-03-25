import { useSignIn } from "@clerk/nextjs";
import {
  Paragraph1,
  Spinner,
  VerifyCode,
} from "@danklabs/pattern-library/core";
import { useState } from "react";

export function ValidateCode({
  heading = (
    <h1 className="text-xl font-normal text-primary">Create Cake Account</h1>
  ),
  paragraph = <p>Check your inbox and paste in the 6 digit code.</p>,
  onSuccess,
}: {
  heading?: React.ReactNode;
  paragraph?: React.ReactNode;
  onSuccess: () => void;
}) {
  const { signIn, isLoaded: isSignInLoaded, setActive } = useSignIn();
  const [loading, setLoading] = useState(false);

  async function handleCodeSubmit(code: string) {
    if (!signIn) {
      throw new Error("signup not loaded");
    }
    setLoading(true);
    await handleSignInFirstFactor(code);
    onSuccess();
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
    onSuccess();
  }
  return (
    <form>
      {heading}
      {paragraph}
      <div className="py-6">
        <VerifyCode
          name="code"
          digits={6}
          onCodeEntered={(code) => handleCodeSubmit(code)}
        />
      </div>
      {loading && (
        <div className="flex flex-row gap-2 items-center">
          <Spinner /> <Paragraph1>Logging in...</Paragraph1>
        </div>
      )}
    </form>
  );
}
