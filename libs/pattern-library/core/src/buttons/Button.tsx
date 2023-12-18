import classNames from "classnames";
import React from "react";

type ButtonProps = {
  disabled?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button
        className={classNames(
          "bg-primary hover:bg-primary-700 text-primary-content font-bold py-2 px-4 rounded disabled:bg-slate-50 disabled:text-black-50"
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
