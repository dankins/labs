"use client";
import { Button } from "@danklabs/pattern-library/core";
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
    <>
      <Button
        onClick={handleClick}
        background="white"
        textColor="black"
        border="neutral/30"
        className={classNames("drop-shadow-xl", className)}
      >
        {children}
      </Button>
      <AddPassBottomSheet
        unclaimedPassCount={unclaimedPassCount}
        brandName={brandName}
        passportValue={passportValue}
        claimPassAction={claimPassAction}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
