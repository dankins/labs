"use client";

import { useEffect } from "react";

export function ServiceWorkerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      console.log("loading service worker");
      navigator.serviceWorker.register("/service-worker.js");
    }

    // This variable will save the event for later use.
    let deferredPrompt;
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevents the default mini-infobar or install dialog from appearing on mobile
      e.preventDefault();
      // Save the event because you'll need to trigger it later.
      deferredPrompt = e;
      // Show your customized install prompt for your PWA
      // Your own UI doesn't have to be a single element, you
      // can have buttons in different locations, or wait to prompt
      // as part of a critical journey.
      console.log("GOT beforeinstallprompt");
    });

    return () => {
      deferredPrompt = null;
    };
  }, []);
  return <>{children}</>;
}
