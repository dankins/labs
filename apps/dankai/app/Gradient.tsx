'use client';
import * as React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function Gradient({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="h-screen min-w-screen"
      initial={{
        background:
          'radial-gradient(circle closest-side, red 0%, transparent 200%)',
      }}
      animate={{
        background:
          'radial-gradient(circle closest-side, blue 25%, transparent 200%)',
      }}
      transition={{
        duration: 3.5,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    >
      {children}
    </motion.div>
  );
}
