import Link from "next/link";
import styles from "./DrawerModal.module.scss";
import classNames from "classnames";

export function DrawerModal({
  returnHref,
  children,
  className,
}: {
  children: React.ReactNode;
  returnHref: string;
  className?: string;
}) {
  return (
    <div className={styles.DrawerModal}>
      <Link href={returnHref} className="cursor-default">
        <div></div>
      </Link>
      <div className={classNames("overflow-y-auto", className)}>{children}</div>
    </div>
  );
}
