"use client";
import { ArrowDownIcon } from "@danklabs/pattern-library/core";
import { useAnimationControls, motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export function ValueProp2() {
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
      id="panel2"
      className="w-screen h-screen p-5 flex flex-col overflow-x-hidden"
      ref={ref}
    >
      <div className="grow">
        <h1
          className="text-[31.25rem] text-primary font-fancy overflow-visible"
          style={{
            transform: isInView ? "none" : "translateX(-200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            lineHeight: "100%",
          }}
        >
          10
        </h1>
        <h3
          className="text-5xl text-primary font-fancy"
          style={{
            transform: isInView ? "none" : "translateX(-200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            transitionDelay: "1s",
          }}
        >
          Destination Brands You Choose
        </h3>
        <p
          style={{
            transform: isInView ? "none" : "translateX(-200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            transitionDelay: "2s",
          }}
        >
          Exclusive and limited offers from the finest brands, available to our
          members. Connect with your favorite brands and enjoy the.....
        </p>
      </div>
      <div className="flex flex-row justify-center items-center text-lg mt-5">
        <a href="#panel3" className="uppercase p-5 font-poppins scroll-smooth">
          <ArrowDownIcon />
        </a>
      </div>
    </motion.div>
  );
}
