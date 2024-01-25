import React from "react";
import { BaseButton, ButtonProps } from "./BaseButton";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <BaseButton ref={ref} {...props} rounded={props.rounded || "full"}>
        {children}
      </BaseButton>
    );
  }
);
