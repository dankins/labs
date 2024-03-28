import { useSignIn } from "@clerk/nextjs";
import {
  Paragraph1,
  Spinner,
  VerifyCode,
} from "@danklabs/pattern-library/core";
import { useState } from "react";

export type CodeValidationResult = {};

export function ValidateCode({
  loading,
  error,
  heading,
  paragraph = <p>Check your inbox and paste in the 6 digit code.</p>,
  onCodeEntered,
}: {
  heading?: React.ReactNode;
  paragraph?: React.ReactNode;
  loading?: boolean;
  error?: string;
  onCodeEntered(code: string): void;
}) {
  return (
    <form>
      {heading}
      {paragraph}
      <div className="py-6">
        <VerifyCode
          name="code"
          digits={6}
          onCodeEntered={(code) => onCodeEntered(code)}
        />
      </div>
      {loading && (
        <div className="flex flex-row gap-2 items-center">
          <Spinner /> <Paragraph1>Logging in...</Paragraph1>
        </div>
      )}
      {error && <Paragraph1 className="text-secondary">{error}</Paragraph1>}
    </form>
  );
}
