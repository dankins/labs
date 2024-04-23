import classNames from "classnames";

export function Currency({
  amount,
  size,
  className,
}: {
  amount: number;
  size: "5xl" | string;
  className?: string;
}) {
  return (
    <div
      className={classNames(
        "inline-blockfont-light flex flex-row justify-center items-top gap-1",
        className
      )}
    >
      <span className="font-xs font-normal">$</span>
      <span className={`text-${size} font-light`}>{amount}</span>
    </div>
  );
}
