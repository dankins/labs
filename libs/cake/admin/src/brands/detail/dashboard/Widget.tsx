import classNames from "classnames";
import Link from "next/link";

export function Widget({
  title,
  href,
  cta,
  children,
  size = "sm",
}: {
  title: string;
  href: string;
  cta: React.ReactNode;
  size?: "sm" | "full";
  children?: React.ReactNode;
}) {
  return (
    <Link href={href} className={classNames(size === "full" && "col-span-3")}>
      <div className="bg-white shadow-md overflow-hidden rounded-lg min-h-[175px] flex flex-col">
        <div className="p-2 text-sm bg-[#F9F9A5]">{title}</div>
        <div className="grow flex flex-col items-center justify-center">
          {children}
        </div>
        <div className="p-2 flex flex-row items-center justify-end text-xs gap-1">
          {cta}
        </div>
      </div>
    </Link>
  );
}
