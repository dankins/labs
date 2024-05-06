import classNames from "classnames";

export function Caption1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={classNames("c1", className)}>{children}</span>;
}

export function Caption3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={classNames("uppercase font-sansSerif", className)}>
      {children}
    </span>
  );
}
