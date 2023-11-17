'use client';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { BlinkingCursor } from './BlinkingCursor';
import { useEffect } from 'react';

// inspired by: https://blog.noelcserepy.com/how-i-created-a-typing-text-animation-with-framer-motion

export function TypewriterSpan({ text }: { text: string }) {
  const count = useMotionValue(0);

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: 'tween', // Not really needed because adding a duration will force "tween"
      duration: text.length / 20,
      ease: 'easeInOut',
    });
    return controls.stop;
  }, []);

  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  return (
    <span className="">
      <motion.span>{displayText}</motion.span>
      <BlinkingCursor />
    </span>
  );
}
