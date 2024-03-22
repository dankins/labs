"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AccountLink({
  icon,
  heading,
  subheading,
  href,
}: {
  icon: React.ReactNode;
  heading: string;
  subheading?: string;
  href: string;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={classNames(
        "py-2 font-apris text-md flex flex-row justify-top gap-3 last:border-b-0 md:border-b-0",
        pathname === href && "text-secondary"
      )}
    >
      <div className="pt-1 flex flex-row justify-top"> {icon}</div>

      <div>
        <div>{heading}</div>
        {subheading && (
          <div className="text-sm text-gray-400 font-normal">{subheading}</div>
        )}
      </div>
    </Link>
  );
}
