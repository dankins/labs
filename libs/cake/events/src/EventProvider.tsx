"use client";
import React, { useContext, useEffect, useMemo } from "react";
import Script from "next/script";

import { AnalyticsBrowser } from "@segment/analytics-next";

const writeKey = process.env["NEXT_PUBLIC_ANALYTICS_WRITE_KEY"]!;

export type EventContextType = {
  pageView: (tags: string[]) => void;
};

// @ts-ignore
export const EventContext = React.createContext<EventContextType>();

export function EventProvider({ children }: { children: React.ReactNode }) {
  const analytics = useMemo(() => new AnalyticsBrowser(), [writeKey]);

  useEffect(() => {
    analytics
      .load({
        writeKey,
        cdnURL: "https://cseg.cakemembers.com",
      })
      .catch((e) => {
        console.error(e);
      });
  }, [writeKey]);

  const pageView = (tags: string[]) => {
    analytics.page({
      tags,
    });
    console.log("pageView fired", tags);
  };

  return (
    <EventContext.Provider value={{ pageView }}>
      {children}
    </EventContext.Provider>
  );
}

export const useEventTracking = () => useContext(EventContext);
