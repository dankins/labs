"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./AppHeader.module.scss";

export function AppHeaderLink({
  children,
  ...props
}: React.ComponentProps<typeof Link>) {
  const pathname = usePathname();
  return (
    <Link
      className={classNames(
        props.className,
        pathname.startsWith(props.href.toString()) ? styles.active : undefined
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
