import React from "react";
import { BaseButton, ButtonProps } from "./BaseButton";
import classNames from "classnames";

export const TertiaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        {...props}
        background={props.background || "transparent"}
        textColor={props.textColor || "text-primary"}
        border={props.border || "border-b border-b-primary"}
        disabledClass={
          "disabled:primary/30 disabled:text-primary/30 disabled:border-b-primary/30"
        }
        activeClass={"border-b active:text-secondary active:border-b-secondary"}
        hoverClass="border-b hover:border-b-primary/80 hover:text-primary/80"
      >
        {children}
      </BaseButton>
    );
  }
);
