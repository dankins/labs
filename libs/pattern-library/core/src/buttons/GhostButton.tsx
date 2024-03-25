import React from "react";
import { BaseButton, ButtonProps } from "./BaseButton";

export const GhostButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        {...props}
        background={"transparent"}
        textColor={props.textColor || "text-neutral-content"}
        border="border-0"
        disabledClass={"disabled:bg-primary/30 disabled:text-white"}
        activeClass={"border active:bg-secondary active:text-white"}
        hoverClass="hover:bg-primary/80 hover:text-primary-content"
      >
        {children}
      </BaseButton>
    );
  }
);
