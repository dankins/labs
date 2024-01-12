"use client";
import { motion } from "framer-motion";
import { sanityImageUrlBuilder } from "@danklabs/integrations/sanitycms";
import { PassportBrandsSelection } from "@danklabs/cake/cms";
import type { PassportType } from "./PassportStack";
import classNames from "classnames";
import { useState } from "react";

export const CARD_HEIGHT = 230;
export const CARD_REVEAL = 52;

export function StackedCard({
  idx,
  pass,
  brand,
}: {
  idx: number;
  pass: PassportType["passes"][0];
  brand?: PassportBrandsSelection;
}) {
  if (!brand) {
    return <div>cannot render {pass.brand.slug}</div>;
  }
  const [fullscreen, setFullscreen] = useState(false);

  const translate = (idx * CARD_HEIGHT - CARD_REVEAL * idx) * -1;

  function handleClick() {
    console.log("clickey", brand, fullscreen);
    setFullscreen((currentExpanded) => !currentExpanded);
  }

  let style = {};
  let classes;
  const cardBackgroundImage = brand.passBackground
    ? sanityImageUrlBuilder.image(brand.passBackground).width(480).url()
    : "https://";
  const fullScreenBackgroundImage = brand.passBackground
    ? sanityImageUrlBuilder.image(brand.passBackground).width(1080).url()
    : "https://";
  const baseStyle = {
    // maxWidth: "500px",
    aspectRatio: "1.586 / 1",
    height: `${CARD_HEIGHT}px`,
    minHeight: `${CARD_HEIGHT}px`,
    //backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url("${cardBackgroundImage}")`,
    transform: `translate(0,${translate}px)`,
    //backgroundRepeat: "no-repeat",
    // backgroundSize: "cover",
  };
  if (!fullscreen) {
    classes = classNames(
      "rounded-lg shadow border border-slate-200 justify-start items-start inline-flex",
      "bg-white"
    );
    style = {
      ...baseStyle,
      // aspectRatio: "1.586 / 1",
      // padding: "4px",
    };
  } else {
    classes = classNames("");
    style = {
      ...baseStyle,
      //position: "fixed",
      //width: "100%"
    };
  }

  const variants = {
    card: {
      // maxWidth: "500px",
      // transition: {
      //   duration: 1,
      // },
    },
    fullscreen: {
      // maxWidth: "100vw",
      // height: "100vh",
      // width: "100vw",
      zIndex: 1000,
      // transition: {
      //   ease: "easeInOut",
      //   duration: 1,
      // },
    },
  };

  const cardStyle = {
    width: "100%",
    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url("${cardBackgroundImage}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  const cardVariants = {
    card: {
      height: `${CARD_HEIGHT}px`,
    },
    fullscreen: {
      width: "100%",
    },
  };

  return (
    <motion.div
      className={classes}
      onClick={handleClick}
      style={style}
      variants={variants}
      animate={fullscreen ? "fullscreen" : "card"}
    >
      <motion.div
        className="aspect-wallet"
        variants={cardVariants}
        animate={fullscreen ? "fullscreen" : "card"}
        style={cardStyle}
      >
        <div className="h-7 justify-start items-center gap-4 flex">
          <div className="grow shrink basis-0 h-7 py-2.5 justify-start items-center flex">
            <div className="w-28 h-5 relative">
              <h1 className="text-white">{brand.name}</h1>
            </div>
          </div>
        </div>
      </motion.div>
      {fullscreen && (
        <motion.div className="bg-red-400 p-10">
          I AM THE FULLSCREEN PORTION
        </motion.div>
      )}
    </motion.div>
  );
}
