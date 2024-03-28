"use client";

import { useState } from "react";
import { Button } from "./Button";
import { ButtonProps } from "./BaseButton";
import { ActionButtonProps } from "./ActionButton";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";

export type ConfirmationButtonProps = {
  confirmMessage?: React.ReactNode;
  confirmCta: React.ReactNode;
  rejectCta: React.ReactNode;
};

export function ConfirmationButton({
  action,
  children,
  confirmMessage,
  confirmCta,
  rejectCta,
  ...rest
}: ButtonProps & ActionButtonProps & ConfirmationButtonProps) {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<"ready" | "confirm" | "complete">("ready");
  async function handleClick() {
    setState("confirm");
  }

  async function handleConfirmation() {
    setLoading(true);
    await action();
    setLoading(false);
    setState("complete");
  }
  async function handleRejection() {
    setState("ready");
  }

  if (state === "confirm") {
    return (
      <div className="flex flex-row gap-2 items-center">
        {confirmMessage}
        <PrimaryButton onClick={handleConfirmation} loading={loading}>
          {confirmCta}
        </PrimaryButton>
        {!loading && (
          <SecondaryButton onClick={handleRejection}>
            {rejectCta}
          </SecondaryButton>
        )}
      </div>
    );
  }
  if (state === "ready") {
    return (
      <PrimaryButton {...rest} onClick={handleClick} loading={loading}>
        {children}
      </PrimaryButton>
    );
  }

  return <></>;
}
