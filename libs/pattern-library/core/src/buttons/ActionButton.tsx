"use client";

import { useState } from "react";
import { ButtonProps } from "./BaseButton";
import { PrimaryButton } from "./PrimaryButton";
import { FormState } from "../inputs";

export type ActionButtonProps = { action(): Promise<FormState> };
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
