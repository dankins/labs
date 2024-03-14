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
  icon?: React.ReactNode;
};

export const BaseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      loading,
      textColor,
      border,
      background,
      rounded,
      icon,
      ...props
    },
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
        {loading ? <Spinner /> : icon}
        {children}
      </button>
    );
  }
);

const ThrowAway = (
  <div className="bg-primary text-primary-content text-xs bg-gray-100 bg-gray-100 text-gray-900 mt-[0rem] mt-[3rem] mt-[6rem] mt-[9rem] mt-[12rem] mt-[15rem] mt-[18rem] mt-[21rem] mt-[24rem] mt-[27rem] mt-[30rem]"></div>
);
