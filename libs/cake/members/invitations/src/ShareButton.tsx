"use client";
import { Button } from "@danklabs/pattern-library/core";
import { useToast } from "@danklabs/pattern-library/motion";
import { isWebShareAvailable } from "@danklabs/utils";

export function ShareButton({
  title,
  url,
  text,
}: {
  title: string;
  url: string;
  text: string | (() => string);
}) {
  const { addToast } = useToast();
  async function handleClick() {
    if (!isWebShareAvailable()) {
      return;
    }
    const shareText = typeof text === "string" ? text : text();

    await navigator.share({
      title,
      text: shareText,
      url,
    });
    addToast("Shared successfully!");
  }
  return <Button onClick={handleClick}>Share Invitation</Button>;
}
