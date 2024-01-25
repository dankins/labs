"use client";
import { Button } from "@danklabs/pattern-library/core";
import { useState } from "react";

export function SelectPassButton({
  claimPassAction,
  children,
}: {
  claimPassAction(): Promise<void>;
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  async function handleClick() {
    setLoading(false);
    await claimPassAction();
    setLoading(false);
  }
  return (
    <Button
      disabled={loading}
      onClick={handleClick}
      background="white"
      textColor="black"
      border="neutral/30"
      className="drop-shadow-xl"
    >
      {children}
    </Button>
  );
}
