"use client";
import { useContext } from "react";
import { Button } from "@danklabs/pattern-library/core";
import { PWAContext, usePWA } from "./PWAProvider";

export function InstallPWAButton() {
  const pwa = usePWA();

  async function installPWA() {
    console.log("prompting to install pwa", pwa);
    if (!pwa.installPrompt) {
      console.error("install prompt not available");
    }
    const prompt = pwa.installPrompt!;
    // deferredPrompt is a global variable we've been using in the sample to capture the `beforeinstallevent`
    prompt.prompt();
    // Find out whether the user confirmed the installation or not
    const { outcome } = await prompt.userChoice;
    // The deferredPrompt can only be used once.
    pwa.installPromptUsed();
    // Act on the user's choice
    if (outcome === "accepted") {
      console.log("User accepted the install prompt.");
    } else if (outcome === "dismissed") {
      console.log("User dismissed the install prompt");
    }
  }

  return pwa.installPrompt ? (
    <Button onClick={() => installPWA()}>Install App</Button>
  ) : null;
}
