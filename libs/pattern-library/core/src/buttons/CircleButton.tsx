import React from "react";
import { BaseButton } from "./BaseButton";
import classNames from "classnames";

export function CircleButton({
  children,
  ...props
}: React.ComponentProps<typeof BaseButton>) {
  return (
    <BaseButton
      {...props}
      rounded="full"
      background={props.background || "primary"}
      textColor={props.textColor || "text-primary-content"}
      border={props.border || "primary"}
      disabledClass={"disabled:bg-primary/30 disabled:text-white"}
      activeClass={"border active:bg-secondary active:text-white"}
      hoverClass="hover:bg-primary/80 hover:text-primary-content"
      uppercase
      padding={props.padding || "p-2"}
    >
      {children}
    </BaseButton>
  );
}
