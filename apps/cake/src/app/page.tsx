"use client";
import classNames from "classnames";
import { AnimatedText } from "@danklabs/pattern-library/motion";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="w-full h-full p-4 min-h-screen bg-[#FFF6DA] text-[#F7B605] flex flex-col items-center justify-center">
      <div className={classNames("flex flex-col items-center container")}>
        <AnimatedText
          el="span"
          text="Cake"
          className={classNames(
            "text-[30vw] font-readex xl:text-[400px] text-transparent uppercase tracking-normal font-bold",
            `bg-center bg-[100% 100%] bg-clip-text bg-[url('/images/homepage/background.jpg')]`
          )}
          letterDelay={0.4}
          style={{ backgroundSize: "100% auto" }}
        />
        <motion.span
          className="font-fancy text-xl capitalize text-center md:text-[4vw]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          Shopping is about to get a lot sweeter.
        </motion.span>
      </div>
    </div>
  );
}
