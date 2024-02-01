"use client";

import { motion, animate, useTransform, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export type MoneyRollProps = {
  amount: number;
  duration?: number;
  className?: string;
};
export function MoneyRoll({ className, amount, duration }: MoneyRollProps) {
  const motionAmount = useMotionValue(amount);
  const rounded = useTransform(
    motionAmount,
    (input) => `$${Math.round(input)}`
  );
  useEffect(() => {
    const animation = animate(motionAmount, amount, {
      duration: duration || 1,
    });

    return animation.stop;
  }, [amount]);

  if (!amount) {
    return <>$ - </>;
  }

  return (
    <>
      <motion.span className={className}>{rounded}</motion.span>
    </>
  );
}
