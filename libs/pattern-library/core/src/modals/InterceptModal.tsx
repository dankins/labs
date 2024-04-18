"use client";
import Link from "next/link";
import styles from "./InterceptModal.module.scss";
import { useEffect } from "react";

export function InterceptModal({
  returnHref,
  children,
}: {
  children: React.ReactNode;
  returnHref: string;
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
    <div className={styles.InterceptModal}>
      <Link href={returnHref} className="cursor-default">
        <div></div>
      </Link>
      <div>{children}</div>
    </div>
  );
}
