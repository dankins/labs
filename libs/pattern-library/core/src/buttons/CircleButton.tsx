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
}
