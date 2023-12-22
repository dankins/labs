import classNames from "classnames";
import React from "react";

export type ButtonProps = React.ComponentPropsWithoutRef<"button">;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={classNames(
          "bg-primary hover:bg-primary-700 text-primary-content font-bold py-2 px-4 rounded disabled:bg-slate-50 disabled:text-black-500"
        )}
      >
        {children}
      </button>
    );
  }
);
