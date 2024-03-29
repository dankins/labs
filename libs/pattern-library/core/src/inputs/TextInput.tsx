import classNames from "classnames";
import React from "react";
import { IconBaseProps } from "react-icons/lib";
export type TextInputProps = React.ComponentPropsWithoutRef<"input"> & {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  helperText?: React.ReactNode;
};

import styles from "./TextInput.module.scss";

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ children, label, helperText, icon, className, ...props }, ref) => {
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
            type="text"
            className={classNames("w-full ps-10 p-2.5 pl-8 text-sm", className)}
            {...props}
          />
        </div>
        {helperText && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
