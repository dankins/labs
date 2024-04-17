import Link from "next/link";
import styles from "./InterceptModal.module.scss";

export function InterceptModal({
  returnHref,
  children,
}: {
  children: React.ReactNode;
  returnHref: string;
}) {
  return (
    <div className={styles.InterceptModal}>
      <Link href={returnHref} className="cursor-default">
        <div></div>
      </Link>
      <div>{children}</div>
    </div>
  );
}

export function Modal({
  children,
  returnHref,
}: {
  children: React.ReactNode;
  returnHref: string;
}) {
  return <div>{children}</div>;
}
