"use client";
import { AddIcon, Button } from "@danklabs/pattern-library/core";
import { useState } from "react";
import { AddPassBottomSheet } from "./AddPassBottomSheet";
import classNames from "classnames";

export function SelectPassButton({
  brandName,
  unclaimedPassCount,
  passportValue,
  claimPassAction,
  className,
  children,
}: {
  brandName: string;
  unclaimedPassCount: number;
  passportValue: number;
  className?: string;
  claimPassAction(): Promise<void>;
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  async function handleClick() {
    setOpen(true);
  }

  return (
    <div className="bg-white border-full p-2">
      <Button
        onClick={handleClick}
        border="neutral/30"
        className={classNames("drop-shadow-xl uppercase", className)}
      >
        <AddIcon /> Add To Collection
      </Button>
    </div>
  );
}
