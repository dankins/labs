"use client";
import Link from "next/link";
import styles from "./DrawerModal.module.scss";
import classNames from "classnames";
import { useEffect } from "react";

export function DrawerModal({
  returnHref,
  children,
  className,
}: {
  children: React.ReactNode;
  returnHref: string;
  className?: string;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.getElementsByTagName("main")[0].style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      document.getElementsByTagName("main")[0].style.overflow = "auto";
    };
  }, []);
  return (
    <div className={styles.DrawerModal}>
      <Link href={returnHref} className="cursor-default">
        <div></div>
      </Link>
      <div className={classNames("overflow-y-auto", className)}>{children}</div>
    </div>
  );
}
