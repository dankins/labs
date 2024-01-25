import classNames from "classnames";

export function Currency({
  amount,
  size,
  className,
}: {
  amount: number;
  size: "5xl";
  className?: string;
}) {
  return (
    <div
      className={classNames(
        "inline-blockfont-light text-red-300 flex flex-row items-top gap-1",
        className
      )}
    >
      <span className="font-xs font-normal">$</span>
      <span className={`text-${size} font-light`}>{amount}</span>
    </div>
  );
}
