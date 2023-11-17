'use client';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './ActionPanel.module.scss';
import { useState } from 'react';

import { DankbotChat } from '@danklabs/laboratory/dankbot';

export function ActionPanel({ children }: { children?: React.ReactNode }) {
  const [active, setActive] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {active ? (
        <ActionContent key="actionContent">{children}</ActionContent>
      ) : (
        <StartButton key="startButton" onClick={() => setActive(!active)} />
      )}
    </AnimatePresence>
  );
}

function StartButton({ onClick }: { onClick?(): void }) {
  return (
    <motion.button
      className={styles.actionPanelButton}
      onClick={onClick}
      initial={{
        rotate: '0deg',
        scale: 1,
      }}
      animate={{
        scale: 1,
      }}
      exit={{
        rotate: '360deg',
        scale: 0,
      }}
      transition={{
        duration: 1,
        ease: 'easeInOut',
      }}
    >
      DO NOT
      <br />
      PRESS!
    </motion.button>
  );
}

function ActionContent({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className={styles.actionPanel}
      initial={{
        rotate: '0deg',
        scale: 0,
      }}
      animate={{
        scale: 1,
      }}
      exit={{
        rotate: '180deg',
        scale: 0,
      }}
      transition={{
        duration: 1,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
