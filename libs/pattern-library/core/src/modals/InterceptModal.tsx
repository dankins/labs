import Link from "next/link";
import styles from "./InterceptModal.module.scss";
import { BackLink } from "./BackLink";

export function InterceptModal({
  children,
}: {
  children: React.ReactNode;
  returnHref: string;
}) {
  return (
    <div className={styles.InterceptModal}>
      <BackLink>
        <div></div>
      </BackLink>
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
