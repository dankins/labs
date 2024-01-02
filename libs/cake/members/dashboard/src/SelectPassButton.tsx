"use client";
import { Button } from "@danklabs/pattern-library/core";
import { useState } from "react";

export function SelectPassButton({
  name,
  claimPassAction,
}: {
  name: string;
  claimPassAction(): Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  async function handleClick() {
    setLoading(false);
    await claimPassAction();
    setLoading(false);
  }
  return (
    <Button disabled={loading} onClick={handleClick}>
      Claim {name} Pass
    </Button>
  );
}
