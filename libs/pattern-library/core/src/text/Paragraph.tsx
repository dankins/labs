export function Paragraph1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className="text-[18px] font-light">{children}</p>;
}

export function Paragraph2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className="text-[14px] font-light">{children}</p>;
}

export function Paragraph3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className="text-[12px]">{children}</p>;
}

export function Paragraph4({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className="text-[11px]">{children}</p>;
}
