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
  disabledClass?: string;
  activeClass?: string;
  hoverClass?: string;
  fontWeight?: "light" | "normal" | "semibold" | "bold";
  border?: ButtonColors;
  rounded?: "full" | "md";
  icon?: React.ReactNode;
  simulateHover?: boolean;
  simulateActive?: boolean;
};

export const BaseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      loading,
      textColor,
      disabledClass,
      activeClass,
      simulateHover,
      simulateActive,
      hoverClass,
      border,
      background,
      rounded,
      icon,
      ...props
    },
    ref
  ) => {
    let backgroundClass = `bg-${background || "primary"}`;
    let borderClass = border;
    let textClass = `${textColor} || "text-primary-content"}`;
    if (simulateActive) {
      backgroundClass = activeClass?.replace("active:bg-", "bg-")!;
      borderClass = activeClass?.replace("active:border-", "border-");
      textClass = activeClass?.replace("active:text-", "text-")!;
    } else if (simulateHover) {
      backgroundClass = hoverClass?.replace("hover:", "")!;
      borderClass = hoverClass?.replace("hover:border-", "border-");
      textClass = hoverClass?.replace("hover:text-", "text-")!;
    }
    const className = classNames(
      "py-2 px-4",
      backgroundClass,
      textClass,
      borderClass,
      props.fontWeight && `font-${props.fontWeight}`,
      rounded && `rounded-${rounded}`,
      hoverClass,
      activeClass,
      disabledClass,
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
  <div className="bg-primary text-primary-content border-b-primary border-primary/80 border-b-secondary bg-secondary bg-black bg-primary/80 border-primary/30 border-primary/80 border-primary border-secondary text-secondary bg-accent text-secondary text-primary-content bg-red-500 text-xs bg-gray-100 bg-gray-100 text-gray-900 mt-[0rem] mt-[3rem] mt-[6rem] mt-[9rem] mt-[12rem] mt-[15rem] mt-[18rem] mt-[21rem] mt-[24rem] mt-[27rem] mt-[30rem]"></div>
);
