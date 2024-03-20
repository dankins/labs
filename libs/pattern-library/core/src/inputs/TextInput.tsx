import classNames from "classnames";
import React from "react";
import { IconBaseProps } from "react-icons/lib";
export type TextInputProps = React.ComponentPropsWithoutRef<"input"> & {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  helperText?: React.ReactNode;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ children, label, helperText, icon, className, ...props }, ref) => {
    return (
      <div className="inline-block w-full">
        {label && (
          <label
            htmlFor="zip-input"
            className="block mb-2 text-sm font-medium "
          >
            {label}
          </label>
        )}
        <div className="relative fill-black flex flex-row">
          {icon && (
            <div className="absolute inset-y-0 start-0 top-0 left-2 flex items-center ps-3.5 pointer-events-none">
              {icon}
            </div>
          )}

          <input
            type="text"
            aria-describedby="helper-text-explanation"
            className={classNames(
              "w-full ps-10 p-2.5 pl-8 border border-gray-300 rounded-lg block text-sm",
              " focus:ring-blue-500 focus:border-blue-500",
              !props.disabled && "bg-white text-black",
              props.disabled && "bg-white/50 text-black cursor-not-allowed",
              className
            )}
            {...props}
            ref={ref}
          />
        </div>
        {helperText && (
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
