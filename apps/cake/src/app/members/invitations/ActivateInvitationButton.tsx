"use client";

import { Button } from "@danklabs/pattern-library/core";
import { useState } from "react";

export function ActivateInvitationButton({
  invitationId,
  activateAction,
}: {
  activateAction(id: string): Promise<void>;
  invitationId: string;
}) {
  const [loading, setLoading] = useState(false);
  async function onClick() {
    try {
      setLoading(true);
      await activateAction(invitationId);
    } catch (err) {
      console.error("error activating invitation", err);
    }

    setLoading(false);
  }
  return (
    <Button disabled={loading} onClick={onClick}>
      Activate
    </Button>
  );
}
