"use client";

import { useState } from "react";

export function StackedDiv({
  children,
  itemHeight,
  idx,
}: {
  children: React.ReactNode;
  idx: number;
  itemHeight: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const translate = idx * 230 - 52 * idx;

  function handleClick() {
    console.log("clickey");
    setExpanded(!expanded);
  }

  return (
    <div
      className={`aspect-wallet`}
      style={{
        height: `${itemHeight}px`,
        transform: `translate(0,-${translate}px )`,
      }}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
