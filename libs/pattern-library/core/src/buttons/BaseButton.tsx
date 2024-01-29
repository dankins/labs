import classNames from "classnames";
import React from "react";
import { Spinner } from "../icons/Spinner";

export type ButtonColors =
  | "primary"
  | "neutral"
  | "white"
  | "black"
  | "transparent"
  | "neutral"
  | string;

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  loading?: boolean;
  background?: ButtonColors;
  textColor?: ButtonColors;
  fontWeight?: "light" | "normal" | "semibold" | "bold";
  border?: ButtonColors;
  rounded?: "full" | "md";
};

export const BaseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, loading, textColor, border, background, rounded, ...props },
    ref
  ) => {
    const className = classNames(
      "py-2 px-4",
      `bg-${background || "primary"}`,
      `text-${textColor || "primary-content"}`,
      border && `border border-${border}`,
      props.fontWeight && `font-${props.fontWeight}`,
      rounded && `rounded-${rounded}`,
      "hover:bg-current/70",
      "active:bg-current/90",
      "disabled:bg-slate-500 disabled:text-slate-300",
      "inline-block flex flex-row items-center gap-2",
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

const ThrowAway = <div className="bg-primary"></div>;
