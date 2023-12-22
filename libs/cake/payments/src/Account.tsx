"use client";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { Button } from "@danklabs/pattern-library/core";
import { useState } from "react";

export function Account({
  active,
  userId,
  userEmailAddress,
  createAccount,
}: {
  active: boolean;
  userId?: string;
  userEmailAddress?: string;
  createAccount(
    formData: FormData
  ): Promise<
    | { error: undefined; userId: string; ticket: string }
    | { error: "ACCOUNT_EXISTS" }
  >;
}) {
  const { isLoaded: authIsLoaded, isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [error, setError] = useState<"ACCOUNT_EXISTS">();

  if (userId) {
    return <div>you are logged in: {userEmailAddress}</div>;
  }

  if (!active) {
    return <div>account (not active)</div>;
  }

  async function handleFormSubmit(formData: FormData) {
    setError(undefined);
    console.log("submit clicked");
    if (!signIn) {
      throw new Error("signin not ready");
    }
    const createAccountResult = await createAccount(formData);
    if (createAccountResult.error) {
      setError(createAccountResult.error);
      return;
    }

    const { userId, ticket } = createAccountResult;
    console.log("starting login", userId, ticket);
    const result = await signIn.create({
      strategy: "ticket",
      ticket,
    });
    if (result.status === "complete") {
      console.log("successly logged in", result);
      setActive({ session: result.createdSessionId });
      return;
    }
    console.log("result", result);
  }

  return (
    <form action={handleFormSubmit} className="flex flex-col gap-3">
      <div>
        <input name="email" placeholder="Email Address" />
      </div>
      <Button type="submit">Continue</Button>
      {error && <ErrorDisplay error={error} />}
    </form>
  );
}

function ErrorDisplay({ error }: { error?: "ACCOUNT_EXISTS" }) {
  if (error === "ACCOUNT_EXISTS") {
    return <div>error: account exists</div>;
  }
}
