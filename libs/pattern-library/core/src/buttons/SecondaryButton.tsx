import React from "react";
import { BaseButton, ButtonProps } from "./BaseButton";
export const SecondaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        {...props}
        background={props.background || "transparent"}
        textColor={props.textColor || "text-primary"}
        border={props.border || "border-primary"}
        disabledClass={
          "disabled:primary/30 disabled:text-primary/30 disabled:border-primary/30"
        }
        activeClass={"border active:text-secondary active:border-secondary"}
        hoverClass="border hover:text-primary/80 hover:border-primary/80"
      >
        {children}
      </BaseButton>
    );
  }
);
