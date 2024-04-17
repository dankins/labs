"use client";
import { AddIcon, TicketIcon } from "@danklabs/pattern-library/core";
import { CancelableActionBar } from "@danklabs/pattern-library/motion";
export function AddPassActionBar({ action }: { action(): Promise<unknown> }) {
  return (
    <div className="fixed bottom-2 w-full flex flex-row items-center">
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
    </div>
  );
}
