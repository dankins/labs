export function Heading1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h1 className={className}>{children}</h1>;
}

export function Heading2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h2 className={className}>{children}</h2>;
}

export function Heading3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h3 className={className}>{children}</h3>;
}

export function Heading4({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h4 className={className}>{children}</h4>;
}
