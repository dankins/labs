"use client";
import { StripeProvider } from "@danklabs/cake/payments";
import { Centered } from "@danklabs/pattern-library/core";
import { motion } from "framer-motion";

export function Container({ children }: { children: React.ReactNode }) {
  return <motion.div className="border p-3 bg-grey">{children}</motion.div>;
}
