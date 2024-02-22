"use client";

import { useEffect, useRef } from "react";

import { useEventTracking } from "./EventProvider";

interface PageViewProps {
  tags: string[];
}

export const PageView = ({ tags }: PageViewProps) => {
  const { pageView } = useEventTracking();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) {
      return;
    }
    pageView(tags);
    called.current = true;
  }, [pageView, tags]);

  return null;
};
