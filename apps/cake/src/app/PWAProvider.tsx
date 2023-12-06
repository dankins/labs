"use client";
import React, { useState } from "react";
import { useContext, useEffect } from "react";

export type PWAContextType = {
  installPrompt?: BeforeInstallPromptEvent;
  installPromptUsed(): void;
};

// @ts-ignore
export const PWAContext = React.createContext<PWAContextType>({
  installPrompt: undefined,
  installPromptUsed() {
    this.installPrompt = undefined;
  },
});

export function PWAProvider({ children }: { children: React.ReactNode }) {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent>();
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      console.log("loading service worker");
      navigator.serviceWorker.register("/service-worker.js");
    }

    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevents the default mini-infobar or install dialog from appearing on mobile
      e.preventDefault();
      // Save the event because you'll need to trigger it later.
      setInstallPrompt(e);
    });
  }, []);
  return (
    <PWAContext.Provider
      value={{
        installPrompt,
        installPromptUsed() {
          this.installPrompt = undefined;
        },
      }}
    >
      {children}
    </PWAContext.Provider>
  );
}

export function usePWA() {
  return useContext(PWAContext);
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
  interface Navigator {
    standalone?: boolean;
  }
}
