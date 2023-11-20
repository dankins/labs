"use client";

import { useEffect, useRef, useState } from "react";

export function ChatMessageContainer({
  children,
  latestMessage,
}: {
  latestMessage: any;
  children: React.ReactNode;
}) {
  const bottom = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (bottom) {
      bottom.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [bottom, latestMessage]);

  return (
    <>
      {!latestMessage && <div>Go on, say something!</div>}
      {children}
      <div ref={bottom} />
    </>
  );
}
