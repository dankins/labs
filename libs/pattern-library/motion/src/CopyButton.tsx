"use client";
import { copy } from "@danklabs/utils";
import { useToast } from "@danklabs/pattern-library/motion";
import {
  BaseButton,
  Button,
  ButtonProps,
  GhostButton,
  PrimaryButton,
  SecondaryButton,
} from "@danklabs/pattern-library/core";
import { ReactElement } from "react";

type StringOrFunc = string | (() => string);

export function CopyButton<T extends React.ElementType = typeof BaseButton>({
  text,
  children,
  as,
  ...props
}: ButtonProps & { as?: T | "secondary" | "ghost"; text: StringOrFunc }) {
  let ButtonComponent = PrimaryButton;
  if (as === "secondary") {
    ButtonComponent = SecondaryButton;
  } else if (as === "ghost") {
    ButtonComponent = GhostButton;
  }
  const { addToast } = useToast();
  function handleClick() {
    if (typeof text === "string") {
      console.log("copy", text);
      copy(text);
    } else {
      copy(text());
    }
    addToast("Copied!");
  }
  return (
    <ButtonComponent onClick={handleClick} {...props}>
      {children}
    </ButtonComponent>
  );
}
