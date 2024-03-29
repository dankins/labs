export type CheckboxProps = React.ComponentPropsWithoutRef<"input"> & {
  label: React.ReactNode;
  icon?: React.ReactNode;
  helperText?: React.ReactNode;
};

export function Checkbox({ helperText, label, ...inputProps }: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        value="on"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        {...inputProps}
      />
      <div className="ms-2 text-sm">
        <label htmlFor="helper-checkbox" className="font-medium">
          {label}
        </label>
        {helperText && (
          <p id="helper-checkbox-text" className="text-xs font-normal">
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
}
