"use client";
import { motion } from "framer-motion";

export function Tagline() {
  return (
    <motion.span
      className="font-fancy text-[3.5vw] capitalize text-center"
      initial={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 1, delay: 2 }}
    >
      Shopping is getting sweeter
    </motion.span>
  );
}
