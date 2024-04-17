import Link from "next/link";
import styles from "./Modal.module.scss";
import classNames from "classnames";

export function Modal({
  returnHref,
  children,
  className,
}: {
  children: React.ReactNode;
  returnHref: string;
  className?: string;
}) {
  return (
    <div className={styles.Modal}>
      <Link href={returnHref} className="cursor-default">
        <div></div>
      </Link>
      <div className={classNames("overflow-y-auto", className)}>{children}</div>
    </div>
  );
}
