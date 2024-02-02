import React from "react";
import { IconBaseProps } from "react-icons/lib";
export type TextInputProps = React.ComponentPropsWithoutRef<"input"> & {
  label: React.ReactNode;
  icon?: React.ReactNode;
  helperText?: React.ReactNode;
};

export const TextInput = React.forwardRef<HTMLTextAreaElement, TextInputProps>(
  ({ children, label, helperText, icon, ...props }, ref) => {
    // return (
    //   <>
    //     <label htmlFor="message" className="block mb-2 text-sm font-medium">
    //       {label}
    //     </label>
    //     <input
    //       id="message"
    //       className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       {...props}
    //     />
    //   </>
    // );

    return (
      <div className="inline-block">
        <label htmlFor="zip-input" className="block mb-2 text-sm font-medium ">
          {label}
        </label>
        <div className="relative fill-black">
          {icon && (
            <div className="absolute inset-y-0 start-0 top-0 left-2 flex items-center ps-3.5 pointer-events-none">
              {icon}
            </div>
          )}

          <input
            type="text"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 pl-8  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            // placeholder="12345 or 12345-6789"
            // pattern="^\d{5}(-\d{4})?$"
            //         required
            {...props}
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
