"use client";
import { Button, CloseIcon } from "@danklabs/pattern-library/core";
import { AnimateSharedLayout, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";

export function ExpandableCard({
  groupId,
  card,
  fullscreen,
}: {
  groupId: string;
  card: React.ReactNode;
  fullscreen: React.ReactNode;
}) {
  const [active, setActive] = useState(false);
  function handleClick() {
    setActive((currentActive) => !currentActive);
  }

  return (
    <LayoutGroup id={groupId}>
      {!active ? (
        <motion.div layoutId="expandable-card" onClick={handleClick}>
          {card}
        </motion.div>
      ) : (
        <div className="fixed top-0 left-0 h-screen w-screen z-50 bg-black/70 z-50">
          <div className="fixed top-5 right-5 z-[1000]">
            <Button onClick={() => setActive(false)} className="bg-black">
              <CloseIcon />
            </Button>
          </div>
          {fullscreen}
        </div>
      )}
    </LayoutGroup>
  );
}
