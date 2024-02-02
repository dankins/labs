"use client";
import { ArrowDownIcon } from "@danklabs/pattern-library/core";
import {
  motion,
  useScroll,
  useInView,
  useTransform,
  useAnimationControls,
  cubicBezier,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

export function ValueProp1() {
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
    <motion.div className="w-screen h-screen p-5 flex flex-col overflow-x-hidden">
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
            src="/images/foyer/Passport.png"
            alt="Brand Pass"
            width={192}
            height={271}
            className="mt-20"
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
          <Image
            id="pass2"
            src="/images/foyer/Passport.png"
            alt="Brand Pass"
            width={192}
            height={271}
            className="mb-20"
          />
        </motion.div>
      </div>
      <div className="grow w-full mt-[40px]" ref={ref}>
        <motion.h1
          className="text-5xl text-primary font-fancy"
          initial="out"
          animate={controls}
          variants={{
            in: { translateX: 0, transition: { duration: 2 } },
            out: { translateX: "calc(100vw * -1)" },
          }}
        >
          Sweet
        </motion.h1>
        <motion.h1
          className="text-5xl text-primary font-fancy"
          initial="out"
          animate={controls}
          variants={{
            in: { translateX: 0, transition: { duration: 2 } },
            out: { translateX: "calc(100vw * -1)" },
          }}
        >
          Privileges.
        </motion.h1>
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
      <div className="flex flex-row justify-center items-center text-lg mt-5">
        <a href="#panel2" className="uppercase p-5 font-poppins scroll-smooth">
          <ArrowDownIcon />
        </a>
      </div>
    </motion.div>
  );
}
