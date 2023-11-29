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
  }, []);
  return <>{children}</>;
}
