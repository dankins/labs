import classNames from "classnames";
import React, { Children } from "react";
import { Spinner } from "../icons/Spinner";
import Link from "next/link";

export type ButtonColors =
  | "primary"
  | "neutral"
  | "white"
  | "black"
  | "transparent"
  | "neutral"
  | string;

export type ButtonPropsCommon = {
  href?: string;
  loading?: boolean;
  active?: boolean;
  background?: ButtonColors;
  textColor?: ButtonColors;
  disabledClass?: string;
  activeClass?: string;
  hoverClass?: string;
  fontWeight?: "light" | "normal" | "semibold" | "bold";
  border?: ButtonColors;
  rounded?: "full" | "md";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  simulateHover?: boolean;
  simulateActive?: boolean;
  size?: "sm" | "md" | "lg";
  uppercase?: boolean;
  align?: "left" | "center" | "right";
  padding?: string;
};

export type LinkButtonProps = React.ComponentPropsWithoutRef<typeof Link> &
  ButtonPropsCommon;
export type ButtonButtonProps = React.ComponentPropsWithoutRef<"button"> &
  ButtonPropsCommon;

export type ButtonProps = LinkButtonProps | ButtonButtonProps;

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
      iconPosition = "left",
      size = "md",
      uppercase,
      align,
      padding: paddingInput,
      ...props
    },
    ref
  ) => {
    let backgroundClass = `bg-${background || "primary"}`;
    let borderClass = border;
    let textClass = textColor || "text-primary-content";
    if (simulateActive || props.active) {
      backgroundClass = activeClass?.replace("active:bg-", "bg-")!;
      borderClass = activeClass?.replace("active:border-", "border-");
      textClass = activeClass?.replace("active:text-", "text-")!;
    } else if (simulateHover) {
      backgroundClass = hoverClass?.replace("hover:", "")!;
      borderClass = hoverClass?.replace("hover:border-", "border-");
      textClass = hoverClass?.replace("hover:text-", "text-")!;
    }
    let padding = paddingInput || "py-2 px-4";
    let fontSize = "text-sm";
    if (size === "sm") {
      fontSize = "text-xs";
      padding = paddingInput || "py-1 px-2";
    }
    if (size === "lg") {
      fontSize = "text-md";
      padding = paddingInput || "py-1 px-2";
    }

    const className = classNames(
      padding,
      fontSize,
      backgroundClass,
      textClass,
      borderClass,
      props.fontWeight && `font-${props.fontWeight}`,
      rounded && `rounded-${rounded}`,
      hoverClass,
      activeClass,
      disabledClass,
      "font-button inline-block flex flex-row items-center gap-2",
      loading && "bg-slate-500 text-slate-300 cursor-default",
      props.className,
      uppercase && "uppercase",
      align && align === "center" ? "justify-center" : "justify-start"
    );

    const inside = (
      <>
        {loading ? <Spinner /> : iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </>
    );

    if (props.href) {
      return (
        <Link
          {...(props as React.ComponentPropsWithoutRef<typeof Link>)}
          className={className}
        >
          {inside}
        </Link>
      );
    }
    return (
      <button
        ref={ref}
        {...(props as React.ComponentPropsWithoutRef<"button">)}
        className={className}
      >
        {inside}
      </button>
    );
  }
);

const ThrowAway = (
  <div className="bg-primary border-button-active text-button-active bg-black/50  bg-button-active text-button-active-content text-primary-content border-b-primary border-primary/80 border-b-secondary bg-secondary bg-black bg-primary/80 border-primary/30 border-primary/80 border-primary border-secondary text-secondary bg-accent text-secondary text-primary-content bg-red-500 text-xs bg-gray-100 bg-gray-100 text-gray-900 mt-[0rem] mt-[3rem] mt-[6rem] mt-[9rem] mt-[12rem] mt-[15rem] mt-[18rem] mt-[21rem] mt-[24rem] mt-[27rem] mt-[30rem]"></div>
);
