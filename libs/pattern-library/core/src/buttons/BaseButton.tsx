import classNames from "classnames";
import React from "react";
import { Spinner } from "../icons/Spinner";

export type ButtonColors = "primary" | "neutral" | "white" | "black" | string;

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  loading?: boolean;
  background?: ButtonColors;
  textColor?: ButtonColors;
  fontWeight?: "light" | "normal" | "semibold" | "bold";
  border?: "primary";
  rounded?: "full" | "md";
};

export const BaseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, loading, ...props }, ref) => {
    const background = props.background || "primary";
    const textColor = props.textColor || "primary-content";
    const className = classNames(
      "py-2 px-4",
      `bg-${background}`,
      `text-${textColor}`,
      props.border && `border border-${props.border}`,
      props.fontWeight && `font-${props.fontWeight}`,
      props.rounded && `rounded-${props.rounded}`,
      "hover:bg-current/70",
      "active:bg-current/90",
      "disabled:bg-slate-500 disabled:text-slate-300",
      loading && "bg-slate-500 text-slate-300 cursor-default",
      props.className
    );
    return (
      <button ref={ref} {...props} className={className}>
        {loading && <Spinner />} {children}
      </button>
    );
  }
);
