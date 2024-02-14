"use client";
import { AddIcon, TicketIcon } from "@danklabs/pattern-library/core";
import { CancelableActionBar } from "@danklabs/pattern-library/motion";
export function AddPassActionBar({ action }: { action(): Promise<unknown> }) {
  return (
    <CancelableActionBar
      ctaHelperText={
        <>
          <TicketIcon /> 8 remaining
        </>
      }
      buttonCta={
        <>
          <AddIcon /> Add To Collection
        </>
      }
      action={action}
      cancelCta={"Cancel"}
      graceHelperText={`Adding to Collection...`}
      processingHelperText={[
        "Updating Cake Cards & Benefits...",
        "Calculating Collection Value...",
        "Pouring the champagne...",
      ]}
      successHelperText="Successfully updated Collection..."
    />
  );
}
