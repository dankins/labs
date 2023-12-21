"use client";

import { Button } from "@danklabs/pattern-library/core";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useQueryStringUpdater } from "../util/searchParams";

export function ContinueButton({ selection }: { selection: string[] }) {
  const updateQueryString = useQueryStringUpdater();

  const disabled = selection.length !== 2;

  function handleClick() {
    updateQueryString("step", "checkout");
  }
  return (
    <Button disabled={disabled} onClick={handleClick}>
      Continue
    </Button>
  );
}
