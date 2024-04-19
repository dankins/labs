import classNames from "classnames";
import React from "react";

export type Size = "sm" | "md" | "lg" | "xl";
export type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  helperText?: React.ReactNode;
  inputSize?: Size;
};

import styles from "./TextInput.module.scss";

const sizeMap = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      children,
      label,
      helperText,
      icon,
      className,
      inputSize = "sm",
      ...props
    },
    ref
  ) => {
    return (
      <div className={styles.TextInput}>
        {label && <label htmlFor={`${props.name}-input`}>{label}</label>}
        <div className="relative flex flex-row">
          {icon && (
            <div
              className={`${styles.Icon} ${
                props.disabled && styles.DisabledLabel
              }`}
            >
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={`${props.name}-input`}
            className={classNames(
              "w-full ps-10 p-2.5 pl-8",
              sizeMap[inputSize],
              className
            )}
            {...props}
          />
        </div>
        {helperText && (
          <p className="mt-2 text-xs text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);
