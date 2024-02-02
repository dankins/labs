"use client";

import { Button, ButtonProps } from "@danklabs/pattern-library/core";
import { useQueryStringUpdater } from "./util/searchParams";

export function LinkToStepButton({
  step,
  children,
  ...props
}: ButtonProps & { step: string }) {
  const updateQueryString = useQueryStringUpdater();
  function handleClick() {
    updateQueryString("step", step);
  }

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  );
}
