import Link from "next/link";
import styles from "./DrawerModal.module.scss";

export function DrawerModal({
  returnHref,
  children,
}: {
  children: React.ReactNode;
  returnHref: string;
}) {
  return (
    <div className={styles.DrawerModal}>
      <Link href={returnHref} className="cursor-default">
        <div></div>
      </Link>
      <div className="overflow-y-auto">{children}</div>
    </div>
  );
}
