import classNames from "classnames";

export function Text({
  children,
  size = "sm",
  weight = "regular",
  face = "serif",
  className: classNameProp,
}: {
  children: React.ReactNode;
  size?: "sm";
  weight?: "regular";
  face?: "sans" | "serif";
  className?: string;
}) {
  const className = classNames(
    "text-base",
    size === "sm" && "text-sm",
    weight === "regular" && "font-normal",
    face === "sans" && "font-sans",
    face === "serif" && "font-serif",
    classNameProp
  );

  return <span className={className}>{children}</span>;
}
