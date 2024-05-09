"use client";
import { AnimatePresence, motion } from "framer-motion";

import { FoyerContainer } from "../FoyerContainer";
import {
  ArrowDownIcon,
  CircleButton,
  Heading3,
  LeftArrow,
  PrimaryButton,
  Text,
} from "@danklabs/pattern-library/core";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Video } from "./Video";
import { Perks } from "./Perks";
import { Cards } from "./Cards";
import { Summary } from "./Summary";
import { Welcome } from "./Welcome";

export function WelcomeStep() {
  const router = useRouter();
  const [view, setView] = useState<
    "welcome" | "video" | "perks" | "cards" | "summary"
  >("welcome");
  return (
    <FoyerContainer>
      <AnimatePresence>
        {view === "welcome" && <Welcome onClick={() => setView("perks")} />}
        {view === "video" && <Video onClick={() => setView("perks")} />}
        {view === "perks" && <Perks onClick={() => setView("cards")} />}
        {view === "cards" && <Cards onClick={() => setView("summary")} />}
        {view === "summary" && <Summary />}
      </AnimatePresence>
    </FoyerContainer>
  );
}
