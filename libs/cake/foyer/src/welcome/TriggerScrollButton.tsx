"use client";
import { Button, ButtonProps } from "@danklabs/pattern-library/core";

export function TriggerScrollButton({ children, ...props }: ButtonProps) {
  function handleClick() {
    console.log("clicky");
    window.scrollTo(window.scrollX, window.scrollY);
  }
  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  );
}
