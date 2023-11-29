import React from "react";

type ButtonProps = { foo?: "foo" } & React.HTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, foo, ...props }, ref) => {
    return (
      <button
        className="bg-primary hover:bg-primary-700 text-primary-content font-bold py-2 px-4 rounded"
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
