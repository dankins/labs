import classNames from "classnames";

export function Currency({
  amount,
  size = "xl",
  className: classNameProp,
}: {
  amount: string | number;
  size?: "lg" | "xl";
  className?: string;
}) {
  const className = classNames(
    size === "lg" && "text-4xl",
    size === "xl" && "text-6xl",
    "font-normal",
    "font-cursive",
    classNameProp
  );
  const supClassName = classNames(
    size === "lg" && "text-2xl",
    size === "xl" && "text-4xl"
  );
  return (
    <span className={className}>
      <sup className={supClassName}>$</sup>
      {amount}
    </span>
  );
}
