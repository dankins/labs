"use client";

import { useState } from "react";
import { Button } from "./Button";
import { ButtonProps } from "./BaseButton";
import { PrimaryButton } from "./PrimaryButton";

export type ActionButtonProps = { action(): Promise<any> };
export function ActionButton({
  action,
  children,
  ...rest
}: ButtonProps & ActionButtonProps) {
  const [loading, setLoading] = useState(false);
  async function handleClick() {
    setLoading(true);
    await action();
    setLoading(false);
  }
  return (
    <PrimaryButton {...rest} onClick={handleClick} loading={loading}>
      {children}
    </PrimaryButton>
  );
}
