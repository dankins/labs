import classNames from "classnames";

export function Paragraph({
  children,
  className,
  size = "medium",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
}) {
  return <p className="font-apris">{children}</p>;
}

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
