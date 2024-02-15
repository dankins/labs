"use client";
import {
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
      className="w-full mx-3 h-[3.8125rem] bg-white rounded-full p-2 flex flex-row items-center gap-2 drop-shadow-xl  text-sm text-black"
    >
      <Content
        {...props}
        onActionReady={submitForm}
        result={typeof state !== "undefined"}
      />
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
      <motion.div className="grow">{ctaHelperText}</motion.div>
      <motion.div>
        <Button
          onClick={onClick}
          border="neutral/30"
          className={classNames("uppercase text-xs")}
        >
          {buttonCta}
        </Button>
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
    <>
      <motion.div layoutId="icon">
        <CircleIcon className="bg-primary">
          <motion.svg className="w-full h-full" viewBox="0 0 40 40">
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
        </CircleIcon>
      </motion.div>
      <motion.div className="grow" layoutId="helperText">
        {graceHelperText}
      </motion.div>
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
    <>
      <motion.div layoutId="icon">
        <CircleIcon className="p-2 bg-[#FFB6B6]">
          <DotWave className="h-full w-full text-2xl fill-white" />
        </CircleIcon>
      </motion.div>

      <motion.div layoutId="helperText" className="grow">
        <AnimatePresence initial={false}>
          {Array.isArray(processingHelperText) ? (
            <motion.div
              key={`idx-${helperTextIdx}`}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
            >
              {processingHelperText[helperTextIdx]}
            </motion.div>
          ) : (
            processingHelperText
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

function Complete({ successHelperText }: ContentProps) {
  useEffect(() => {}, []);

  return (
    <>
      <CircleIcon className="bg-primary">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            fill="none"
            initial={{ strokeWidth: 0 }}
            animate={{ strokeWidth: 8, transition: { duration: 2 } }}
            stroke="white"
            d="M20,50 L40,70 L80,30"
          />
        </svg>
      </CircleIcon>
      <div className="grow">{successHelperText}</div>
    </>
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
