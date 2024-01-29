import React from "react";
import { BaseButton, ButtonProps } from "./BaseButton";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        {...props}
        rounded="full"
        background={props.background || "primary"}
        textColor={props.textColor || "primary-content"}
        border={props.border || "primary"}
      >
        {children}
      </BaseButton>
    );
  }
);
