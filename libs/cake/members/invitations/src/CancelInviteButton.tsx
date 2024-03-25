"use client";
import { Button, SecondaryButton } from "@danklabs/pattern-library/core";
import { useToast } from "@danklabs/pattern-library/motion";

export function CancelInviteButton({
  cancelInviteAction,
}: {
  cancelInviteAction(): Promise<void>;
}) {
  const { addToast } = useToast();
  async function handleClick() {
    await cancelInviteAction();
    addToast("Invite cancelled and available to resend");
  }
  return <SecondaryButton onClick={handleClick}>Cancel</SecondaryButton>;
}
