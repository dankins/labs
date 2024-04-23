"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./AppHeader.module.scss";
import { useEffect, useState } from "react";

export function AppHeaderLink({
  children,
  ...props
}: React.ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    if (props.href === pathname && changing) {
      setChanging(false);
      document.getElementById("side-menu")?.click();
    }
  }, [pathname, changing]);

  function handleClick() {
    setChanging(true);
  }

  return (
    <Link
      className={classNames(
        props.className,
        pathname.startsWith(props.href.toString()) ? styles.active : undefined
      )}
      {...props}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
