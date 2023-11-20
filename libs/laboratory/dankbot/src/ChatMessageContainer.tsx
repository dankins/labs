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
      console.log("scrollin down the river");
      bottom.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [bottom, latestMessage]);

  return (
    <>
      {children}
      <div ref={bottom} />
    </>
  );
}
