"use client";
import {
  AddIcon,
  Button,
  CheckCircleIcon,
  DotWave,
} from "@danklabs/pattern-library/core";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  motion,
  LayoutGroup,
  useTime,
  useTransform,
  AnimatePresence,
} from "framer-motion";

type States = "initial" | "gracePeriod" | "processing";

export type CancelableActionBarProps = {
  ctaHelperText: React.ReactNode;
  graceHelperText: React.ReactNode;
  successHelperText: React.ReactNode;
  cancelCta: React.ReactNode;
  buttonCta: React.ReactNode;
  processingHelperText: React.ReactNode | React.ReactNode[];
  action(): Promise<unknown>;
  gracePeriod?: number;
  className?: string;
};
export function CancelableActionBar({
  action,
  ...props
}: CancelableActionBarProps) {
  const ref = useRef<HTMLFormElement>(null);
  const [fired, setFired] = useState(false);
  const [state, formAction] = useFormState(action, undefined);

  function submitForm() {
    console.log("submit form", state);
    if (ref.current && !fired) {
      console.log("sending action");
      ref.current?.requestSubmit();
      setFired(true);
    }
  }

  return (
    <motion.form
      layout
      action={formAction}
      ref={ref}
      className="text-black w-full flex flex-col items-center"
      //  className="w-full mx-3 h-[3.8125rem] bg-white rounded-full p-2 flex flex-row items-center gap-2 drop-shadow-xl  text-sm text-black"
    >
      <LayoutGroup>
        <AnimatePresence>
          <Content
            {...props}
            onActionReady={submitForm}
            result={typeof state !== "undefined"}
          />
        </AnimatePresence>
      </LayoutGroup>
    </motion.form>
  );
}

type ContentProps = Omit<CancelableActionBarProps, "action">;
type ContentComponentProps = ContentProps & {
  result?: boolean;
  onActionReady(): void;
};

function Content({ result, onActionReady, ...props }: ContentComponentProps) {
  const formStatus = useFormStatus();

  const [state, setState] = useState<States>("initial");
  if (formStatus.pending) {
    return <Processing {...props} />;
  }
  if (result) {
    return <Complete {...props} />;
  }

  switch (state) {
    case "initial":
      return <Initial {...props} onClick={() => setState("gracePeriod")} />;
    case "gracePeriod":
      return (
        <GracePeriod
          {...props}
          onCancel={() => setState("initial")}
          onExpired={() => {
            onActionReady();
          }}
        />
      );
  }
}

function Initial({
  ctaHelperText,
  buttonCta,
  onClick,
}: ContentProps & { onClick(): void }) {
  return (
    <>
      <motion.div
        layoutId="container"
        style={{ borderRadius: 9999 }}
        className="h-[3.8125rem] p-2 rounded-full bg-white shadow-xl uppercase cursor-point flex flex-row items-center"
        // initial={{ width: "200px" }}
        animate={{
          // width: "200px",
          transition: { ease: "easeIn", duration: 0.3 },
        }}
        onClick={onClick}
      >
        <AddIcon /> Add to Collection
        <motion.span
          className="grow text-sm font-semibold"
          exit={{ x: 15, opacity: 0 }}
          transition={{
            layout: {
              duration: 0.4,
            },
          }}
        ></motion.span>
      </motion.div>
    </>
  );
}

function GracePeriod({
  cancelCta,
  graceHelperText,
  gracePeriod = 3000,
  onExpired,
  onCancel,
}: ContentProps & { onCancel(): void; onExpired(): void }) {
  useEffect(() => {
    const timeout = setTimeout(() => onExpired(), gracePeriod);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  const time = useTime();
  const pathLength = useTransform(
    time,
    [0, gracePeriod], // For every 4 seconds...
    [0, 1] // ...rotate 360deg
  );

  return (
    <motion.div
      layoutId="container"
      style={{ borderRadius: 9999 }}
      initial={{ width: "auto" }}
      animate={{ width: "100%", transition: { duration: 0.3 } }}
      className="h-[3.8125rem] w-full  p-2 rounded-full bg-white shadow-xl cursor-point flex flex-row justify-center items-center gap-2"
    >
      <motion.svg
        className="w-[2.5rem] h-[2.5rem]"
        viewBox="0 0 40 40"
        initial={{ scale: 0 }}
        animate={{
          scale: 1,
          transition: { ease: "easeIn", duration: 0.3 },
        }}
      >
        <motion.circle
          cx="20"
          cy="20"
          r="14"
          stroke="#FFE1E1"
          strokeWidth={"3"}
          fill={"transparent"}
        />
        <motion.circle
          cx="20"
          cy="20"
          r="14"
          stroke="#FFB6B6"
          strokeWidth={"3"}
          fill={"transparent"}
          style={{ pathLength }}
        />
      </motion.svg>
      <motion.div
        className="grow text-sm"
        layoutId="helperText"
        key="helperText"
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { delay: 0.3, duration: 0.3 },
        }}
        exit={{ x: -10, opacity: 0 }}
        transition={{
          layout: {
            duration: 0.4,
          },
        }}
      >
        {graceHelperText}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { ease: "easeIn", duration: 0.3, delay: 0.3 },
        }}
        exit={{ x: -10, opacity: 0 }}
      >
        <Button
          onClick={onCancel}
          border="transparent"
          background="transparent"
          textColor="[#F98080]"
          className={classNames("uppercase text-xs")}
        >
          {cancelCta}
        </Button>
      </motion.div>
    </motion.div>
  );
}

function Processing({
  processingHelperText,
  transitionTime = 1500,
}: ContentProps & { transitionTime?: number }) {
  const [helperTextIdx, setHelperTextIdx] = useState(0);
  useEffect(() => {
    let interval = setInterval(() => {
      if (Array.isArray(processingHelperText)) {
        setHelperTextIdx((cur) => {
          if (cur < processingHelperText.length - 1) {
            return cur + 1;
          }
          return (cur + 1) % processingHelperText.length;
        });
      }
    }, transitionTime);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      layoutId="container"
      style={{ borderRadius: 9999 }}
      className="h-[3.8125rem] w-full  p-2 rounded-full bg-white shadow-xl cursor-point flex flex-row justify-center items-center gap-2"
    >
      <motion.div layoutId="icon">
        <CircleIcon className="p-2 bg-[#FFB6B6]">
          <DotWave className="h-full w-full text-2xl fill-white" />
        </CircleIcon>
      </motion.div>

      <motion.div className="grow">
        {Array.isArray(processingHelperText) ? (
          <motion.div
            key={`idx-${helperTextIdx}`}
            className="grow text-sm"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
          >
            {processingHelperText[helperTextIdx]}
          </motion.div>
        ) : (
          processingHelperText
        )}
      </motion.div>
    </motion.div>
  );
}

function Complete({ successHelperText }: ContentProps) {
  useEffect(() => {}, []);

  return (
    <motion.div
      layoutId="container"
      style={{ borderRadius: "50%" }}
      animate={{
        y: 300,
        transition: { delay: 1, duration: 0.5 },
      }}
      className="h-[3.8125rem] w-[3.8125rem] p-2 bg-[#FEDFDD] shadow-xl cursor-point flex flex-row justify-center items-center gap-2"
    >
      <motion.svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          fill="none"
          initial={{ strokeWidth: 0, scale: 0.5 }}
          animate={{
            strokeWidth: 8,
            scale: 1.2,
            transition: {
              type: "spring",
              damping: 10,
              stiffness: 100,
              duration: 1,
              delay: 0.3,
            },
          }}
          stroke="black"
          d="M20,50 L40,70 L80,30"
        />
      </motion.svg>
    </motion.div>
  );
}

function CircleIcon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={classNames("w-[40px] h-[40px] rounded-full", className)}>
      {children}
    </div>
  );
}
