"use client";
import { motion, useAnimationControls, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { Button } from "@danklabs/pattern-library/core";
import { LinkToStepButton } from "../LinkToStepButton";

export function ValueProp3() {
  const ref = useRef(null);
  const controls = useAnimationControls();
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  useEffect(() => {
    console.log("start controls", isInView ? "visible" : "hidden");
    controls.start(isInView ? "in" : "out");
  }, [isInView]);

  return (
    <motion.div
      className="w-screen h-screen p-5 flex flex-col overflow-x-hidden"
      ref={ref}
    >
      <div className="grow">
        <div className="flex flex-row">
          <motion.div
            initial="out"
            animate={controls}
            variants={{
              in: {
                translateX: 0,
                rotate: 0,
                transition: { duration: 1 },
              },
              out: {
                translateX: `calc(-100vw)`,
                rotate: -45,
              },
            }}
          >
            <Image
              id="pass2"
              src="/images/foyer/Passport Pass.png"
              alt="Brand Pass"
              width={398}
              height={200}
              className="mb-20"
            />
          </motion.div>
          <motion.div
            initial="out"
            animate={controls}
            variants={{
              in: {
                translateX: 0,
                rotate: 0,
                transition: { duration: 2 },
              },
              out: {
                translateX: `calc(100vw)`,
                rotate: 45,
              },
            }}
          >
            {" "}
            <Image
              src="/images/foyer/Bonus Pass.png"
              alt="Bonus Pass"
              width={398}
              height={200}
              className="mt-20"
            />
          </motion.div>
        </div>
        <motion.h3
          className="text-5xl text-primary font-fancy"
          initial="out"
          animate={controls}
          variants={{
            in: { translateX: 0, transition: { duration: 2 } },
            out: { translateX: "calc(100vw * -1)" },
          }}
        >
          Cake Passes
        </motion.h3>
        <motion.p
          className="mt-[20px]"
          initial="out"
          animate={controls}
          variants={{
            in: { translateX: 0, transition: { duration: 2 } },
            out: { translateX: "calc(100vw * 1)" },
          }}
        >
          Exclusive and limited offers from the finest brands, available to our
          members. Connect with your favorite brands and enjoy the.....
        </motion.p>
      </div>
      <div className="flex flex-row justify-center items-center text-lg">
        <LinkToStepButton step="account">Get Started</LinkToStepButton>
      </div>
    </motion.div>
  );
}
