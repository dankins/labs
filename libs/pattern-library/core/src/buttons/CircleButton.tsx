import React from "react";
import { BaseButton, ButtonProps } from "./BaseButton";
import classNames from "classnames";

export type CircleButtonProps = {
  size: 24;
} & ButtonProps;
export const CircleButton = React.forwardRef<
  HTMLButtonElement,
  CircleButtonProps
>(({ size, children, ...props }, ref) => {
  return (
    <BaseButton
      ref={ref}
      {...props}
      rounded="full"
      background={props.background || "primary"}
      textColor={props.textColor || "primary-content"}
      border={props.border || "primary"}
      className={classNames(
        props.className,
        `w-20 h-20 flex flex-row justify-center items-center`
      )}
    >
      {children}
    </BaseButton>
  );
});
