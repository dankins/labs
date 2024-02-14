"use client";
import {
  Button,
  CheckCircleIcon,
  DotWave,
} from "@danklabs/pattern-library/core";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { motion, LayoutGroup, useTime, useTransform } from "framer-motion";
import { useFormStatus } from "react-dom";

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
    <form
      action={formAction}
      ref={ref}
      className="w-full mx-3 bg-white rounded-full p-2 flex flex-row items-center gap-2 drop-shadow-xl  text-sm text-black"
    >
      <Content
        {...props}
        onActionReady={submitForm}
        result={typeof state !== "undefined"}
      />
    </form>
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
  console.log("what to do?", formStatus, state);
  if (formStatus.pending) {
    return <Processing {...props} onCancel={() => setState("initial")} />;
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
      <div className="grow">{ctaHelperText}</div>
      <Button
        onClick={onClick}
        border="neutral/30"
        className={classNames("uppercase text-xs")}
      >
        {buttonCta}
      </Button>
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

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };

  return (
    <>
      <motion.svg width="34" height="34" viewBox="0 0 40 40" fill="#fcbfbb">
        <motion.circle
          cx="20"
          cy="20"
          r="20"
          stroke="transparent"
          fill={"#FEDFDD"}
        />
        <motion.circle
          cx="20"
          cy="20"
          r="14"
          stroke="#FFB6B6"
          strokeWidth={"3"}
          fill={"transparent"}
        />
        <motion.circle
          cx="20"
          cy="20"
          r="14"
          stroke="white"
          strokeWidth={"3"}
          fill={"transparent"}
          style={{ pathLength }}
        />
      </motion.svg>
      <div className="grow">{graceHelperText}</div>
      <Button
        onClick={onCancel}
        border="transparent"
        background="transparent"
        textColor="[#F98080]"
        className={classNames("uppercase text-xs")}
      >
        {cancelCta}
      </Button>
    </>
  );
}

function Processing({
  processingHelperText,
  transitionTime = 3000,
  cancelCta,
  onCancel,
}: ContentProps & { transitionTime?: number; onCancel(): void }) {
  const [helperTextIdx, setHelperTextIdx] = useState(0);
  useEffect(() => {
    let interval = setInterval(() => {
      if (Array.isArray(processingHelperText)) {
        setHelperTextIdx((cur) => {
          if (cur < processingHelperText.length - 1) {
            return cur + 1;
          }
          return cur;
        });
      }
    }, transitionTime);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <DotWave />
      <div className="grow">
        {Array.isArray(processingHelperText)
          ? processingHelperText[helperTextIdx]
          : processingHelperText}
      </div>
    </>
  );
}

function Complete({ successHelperText }: ContentProps) {
  useEffect(() => {}, []);

  return (
    <>
      <CheckCircleIcon className="h-[40px] w-[40px] stroke-white fill-primary" />
      <div className="grow">{successHelperText}</div>
    </>
  );
}
