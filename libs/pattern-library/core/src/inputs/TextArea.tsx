import React from "react";

export type TextAreaProps = React.ComponentPropsWithoutRef<"textarea"> & {
  label: React.ReactNode;
};

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ children, label, ...props }, ref) => {
    return (
      <>
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <textarea
          id="message"
          ref={ref}
          rows={props.rows || 4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...props}
        ></textarea>
      </>
    );
  }
);
