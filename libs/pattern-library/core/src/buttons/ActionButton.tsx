"use client";

import { useState } from "react";
import { Button } from "./Button";
import { ButtonProps } from "./BaseButton";

export function ActionButton({
  action,
  children,
  ...rest
}: ButtonProps & { action(): Promise<any> }) {
  const [loading, setLoading] = useState(false);
  async function handleClick() {
    setLoading(true);
    await action();
    setLoading(false);
  }
  return (
    <Button {...rest} onClick={handleClick} loading={loading}>
      {children}
    </Button>
  );
}
