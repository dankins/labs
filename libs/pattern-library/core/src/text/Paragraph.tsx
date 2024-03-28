import classNames from "classnames";

export function Paragraph1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={classNames("p1", className)}>{children}</p>;
}

export function Paragraph2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={classNames("p2", className)}>{children}</p>;
}

export function Paragraph3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={classNames("3", className)}>{children}</p>;
}

export function Paragraph4({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={classNames("p4", className)}>{children}</p>;
}
