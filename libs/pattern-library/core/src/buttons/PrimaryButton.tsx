import React from "react";
import { BaseButton, ButtonProps } from "./BaseButton";

export const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        {...props}
        background={props.background || "primary"}
        textColor={props.textColor || "text-primary-content"}
        border={props.border || "primary"}
        disabledClass={"disabled:bg-primary/30 disabled:text-white"}
        activeClass={
          "border active:bg-button-active active:text-button-active-content"
        }
        hoverClass="hover:bg-primary/80 hover:text-primary-content"
        uppercase
      >
        {children}
      </BaseButton>
    );
  }
);
