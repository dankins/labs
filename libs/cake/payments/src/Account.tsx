"use client";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { Button } from "@danklabs/pattern-library/core";
import { ChangeEvent, useRef, useState } from "react";
import { useFormState } from "react-dom";

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
  const [valid, setValid] = useState(false);
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

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const isValid = value.length > 0;
    if (isValid !== valid) {
      setValid(isValid);
    }
  }

  return (
    <form action={handleFormSubmit} className="flex flex-col gap-3">
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <Button type="submit" disabled={!valid}>
        Continue
      </Button>
      {error && <ErrorDisplay error={error} />}
    </form>
  );
}

function ErrorDisplay({ error }: { error?: "ACCOUNT_EXISTS" }) {
  if (error === "ACCOUNT_EXISTS") {
    return <div>error: account exists</div>;
  }
}
