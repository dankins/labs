"use client";
import classNames from "classnames";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, useAnimation, HTMLMotionProps } from "framer-motion";

export type BottomSheetProps = {
  id?: string;
  open: boolean;
  children?: React.ReactNode;
  title?: string;
  onClose(): void;
};

export function BottomSheet({
  id,
  open,
  children,
  title,
  onClose,
}: BottomSheetProps) {
  const controls = useAnimation();
  const isMobile = useMediaQuery({ query: "(max-width: 765px)" });

  useEffect(() => {
    controls.start(open ? "active" : "inactive");
  }, [open, controls]);

  function closeDrawer() {
    onClose();
  }

  const initialStylesBottom: HTMLMotionProps<"div">["initial"] = {
    position: "fixed",
    bottom: "-100vh",
    left: 0,
  };

  const initialStylesRight: HTMLMotionProps<"div">["initial"] = {
    position: "fixed",
    height: "100%",
    width: "350px",
    top: 0,
    right: -350,
  };

  const bodyStylesBottom = {
    active: {
      bottom: 0,
      transition: {
        duration: 0.5,
      },
    },
    inactive: {
      bottom: "-100vh",
      transition: {
        duration: 0.75,
      },
    },
  };

  const bodyStylesRight = {
    active: {
      right: 0,
      transition: {
        duration: 0.5,
      },
    },
    inactive: {
      right: -350,
      transition: {
        duration: 0.75,
      },
    },
  };

  let initialStyles = initialStylesBottom;
  const bodyStyles = bodyStylesBottom;

  if (!open) {
    return <></>;
  }

  return (
    <motion.div
      className={classNames("p-4 bg-white text-black w-full", "min-h-[90vh] ")}
      initial={initialStyles}
      animate={controls}
      variants={bodyStyles}
    >
      {/** HEADING */}
      <div className="flex flex-row items-center gap-4 text-gray-400">
        <svg
          className="w-4 h-4 me-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <h5 className="grow" id={`${id}-label`}>
          {title}
        </h5>
        <button
          type="button"
          aria-controls={id}
          className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
          onClick={closeDrawer}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
      </div>
      <div className="h-full flex flex-col">{children}</div>
    </motion.div>
  );
}
