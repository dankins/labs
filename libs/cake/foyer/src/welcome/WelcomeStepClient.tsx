"use client";
import { AnimatePresence, motion } from "framer-motion";

import { FoyerContainer } from "../FoyerContainer";

import React, { useState } from "react";
import { Video } from "./Video";
import { Perks } from "./Perks";
import { Cards } from "./Cards";
import { Summary } from "./Summary";

export function WelcomeStepClient({ playbackId }: { playbackId: string }) {
  const [view, setView] = useState<"video" | "perks" | "cards" | "summary">(
    "video"
  );
  return (
    <FoyerContainer>
      <AnimatePresence>
        {view === "video" && (
          <motion.div
            key="video"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{ duration: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 1 },
            }}
          >
            <Video playbackId={playbackId} onClick={() => setView("perks")} />
          </motion.div>
        )}
        {view === "perks" && (
          <motion.div
            key="perks"
            transition={{ delay: 1.5, duration: 0.5 }}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              y: 100,
              transition: { delay: 0, duration: 0.5 },
            }}
          >
            <Perks onClick={() => setView("cards")} />
          </motion.div>
        )}
        {view === "cards" && (
          <motion.div
            key="cards"
            transition={{ delay: 0.5, duration: 0.5 }}
            initial={{
              opacity: 0,
              y: -100,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 100,
            }}
          >
            <Cards onClick={() => setView("summary")} />
          </motion.div>
        )}
        {view === "summary" && (
          <motion.div
            key="summary"
            transition={{ delay: 0.5, duration: 0.5 }}
            initial={{
              opacity: 0,
              y: -100,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 100,
            }}
          >
            <Summary />
          </motion.div>
        )}
      </AnimatePresence>
    </FoyerContainer>
  );
}
