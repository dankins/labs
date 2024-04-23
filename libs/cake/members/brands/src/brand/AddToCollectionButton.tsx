"use client";

import { PrimaryButton } from "@danklabs/pattern-library/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AddToCollectionButton({
  action,
}: {
  action(): Promise<unknown>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function handleClick() {
    setLoading(true);
    await action();
    router.push("/brands");
    setLoading(false);
  }
  return (
    <PrimaryButton onClick={handleClick} loading={loading}>
      Continue
    </PrimaryButton>
  );
}
