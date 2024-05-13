import classNames from "classnames";

export function Text({
  children,
  size = "sm",
  weight = "regular",
  face = "serif",
  uppercase,
  className: classNameProp,
}: {
  children?: React.ReactNode;
  size?: "sm";
  weight?: "regular" | "bold";
  face?: "sans" | "serif";
  uppercase?: boolean;
  className?: string;
}) {
  const className = classNames(
    "text-base",
    size === "sm" && "text-sm",
    weight === "regular" && "font-normal",
    weight === "bold" && "font-bold",
    face === "sans" && "font-sans",
    face === "serif" && "font-serif",
    uppercase && "uppercase",
    classNameProp
  );

  return <span className={className}>{children}</span>;
}
