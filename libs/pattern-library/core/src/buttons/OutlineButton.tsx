import classNames from "classnames";
import React from "react";
import { BaseButton, ButtonProps } from "./BaseButton";

export const OutlineButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        {...props}
        rounded="full"
        background={props.background || "primary-content"}
        textColor={props.textColor || "black"}
        border={props.border || "primary"}
      >
        {children}
      </BaseButton>
    );
  }
);
