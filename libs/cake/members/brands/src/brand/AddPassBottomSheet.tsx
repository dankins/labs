"use client";
import { Currency } from "@danklabs/cake/pattern-library/core";
import {
  Button,
  BottomSheet,
  BottomSheetProps,
} from "@danklabs/pattern-library/core";
import classNames from "classnames";
import { animate, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";

export type AddPassBottomSheetProps = BottomSheetProps & {
  unclaimedPassCount: number;
  passportValue: number;
  brandName: string;
  claimPassAction(): Promise<void>;
};
export function AddPassBottomSheet({
  passportValue,
  unclaimedPassCount,
  brandName,
  claimPassAction,
  open,
  onClose,
}: AddPassBottomSheetProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentPassportValue, setPassportValue] = useState(passportValue);
  async function handleConfirm() {
    setLoading(true);
    await claimPassAction();
    setSuccess(true);
    setLoading(false);
    setPassportValue(passportValue + 100);
  }
  const motionPassportValue = useMotionValue(passportValue);
  const rounded = useTransform(motionPassportValue, Math.round);
  useEffect(() => {
    const animation = animate(motionPassportValue, currentPassportValue, {
      duration: 1,
    });

    return animation.stop;
  }, [currentPassportValue]);

  return (
    <BottomSheet open={open} title="Add Pass to Passport" onClose={onClose}>
      {success ? (
        <div className="h-full flex flex-col min-h-[250px] text-black items-center justify-center">
          <h1 className="text-3xl mt-5">🥂 You're in!</h1>
          <p>
            Your {brandName} pass has been added to your passport and is ready
            for shopping.
          </p>

          <div className="flex flex-col items-center justify-center grow">
            <h3 className="text-black/50 text-sm uppercase mt-10">
              Available Passport Value
            </h3>
            <div
              className={classNames(
                "inline-blockfont-light text-red-300 flex flex-row items-top gap-1"
              )}
            >
              <span className="font-xs font-normal">$</span>
              <motion.span className={`text-7xl font-light`}>
                {rounded}
              </motion.span>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col min-h-[250px]">
          <p className="text-black grow text-lg">
            Are you sure you would like to claim this pass? You currently have{" "}
            {unclaimedPassCount} unclaimed passes.
          </p>

          <div className="flex flex-row gap-4">
            <Button
              background="primary"
              border="black"
              textColor="black"
              onClick={handleConfirm}
              loading={loading}
            >
              Claim Pass
            </Button>
            <Button
              background="transparent"
              textColor="black"
              onClick={() => onClose()}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}
