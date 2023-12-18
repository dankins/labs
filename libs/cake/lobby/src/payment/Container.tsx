"use client";
import { Centered } from "@danklabs/pattern-library/core";
import { motion } from "framer-motion";

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <Centered>
      <motion.div className="border p-3 bg-grey">{children}</motion.div>
    </Centered>
  );
}
