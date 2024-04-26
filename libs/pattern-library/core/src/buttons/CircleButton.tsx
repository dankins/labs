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
        `flex flex-row justify-center items-center`
      )}
      padding={props.padding || "p-2"}
    >
      {children}
    </BaseButton>
  );
}
