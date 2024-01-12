import classNames from "classnames";
import React from "react";
import { Spinner } from "../icons/Spinner";

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  loading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, loading, ...props }, ref) => {
    const className = classNames(
      "bg-primary text-primary-content font-bold py-2 px-4 rounded ",
      "hover:bg-primary/70",
      "active:bg-primary/90",
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
