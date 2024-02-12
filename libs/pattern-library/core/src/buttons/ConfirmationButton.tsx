"use client";

import { useState } from "react";
import { Button } from "./Button";
import { ButtonProps } from "./BaseButton";
import { ActionButtonProps } from "./ActionButton";

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
        <Button onClick={handleConfirmation} loading={loading}>
          {confirmCta}
        </Button>
        {!loading && <Button onClick={handleRejection}>{rejectCta}</Button>}
      </div>
    );
  }
  if (state === "ready") {
    return (
      <Button {...rest} onClick={handleClick} loading={loading}>
        {children}
      </Button>
    );
  }

  return <></>;
}
