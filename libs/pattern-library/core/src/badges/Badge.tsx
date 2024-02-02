import classNames from "classnames";

export function Badge({
  children,
  className,
  size,
}: {
  children: React.ReactNode;
  size?: "xs" | "md";
  className?: string;
}) {
  return (
    <span
      className={classNames(
        "bg-black/20 text-white font-medium inline-flex items-center px-2.5 py-0.5 rounded-full me-2  flex flex-row gap-1",
        size === "md" ? "text-medium" : "text-xs",
        className
      )}
    >
      {children}
    </span>
  );
}
