"use client";

import { SecondaryButton } from "@danklabs/pattern-library/core";
import { useSearchParams } from "next/navigation";

export function PatissierButton() {
  const sp = useSearchParams();
  if (sp.has("perspective") && sp.get("perspective") === "admin") {
    return (
      <SecondaryButton className="text-white border-white" href="?">
        Disable Previews
      </SecondaryButton>
    );
  } else {
    return (
      <SecondaryButton
        className="text-white border-white"
        href="?perspective=admin"
      >
        Enable Previews
      </SecondaryButton>
    );
  }
}
