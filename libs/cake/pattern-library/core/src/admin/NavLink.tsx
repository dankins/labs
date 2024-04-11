"use client";
import classNames from "classnames";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import nav from "./AdminNav.module.scss";

export function NavLink({
  href,
  match,
  linkInner,
  children,
}: {
  href: string;
  match: string[];
  linkInner: React.ReactNode;
  children?: React.ReactNode;
}) {
  const segments = useSelectedLayoutSegments();
  const activeSection = match.length === 0 || segments[0] === match[0];
  const activePage =
    (match.length === 0 && segments.length === 0) ||
    (segments.length > 0 &&
      segments.every((segment, index) => segment === match[index]));

  return (
    <>
      <Link
        href={href}
        className={classNames(
          nav.NavItem,
          activeSection && nav.activeSection,
          activePage && nav.activePage
        )}
      >
        {linkInner}
      </Link>
      {children ? <div>{children}</div> : undefined}
    </>
  );
}
