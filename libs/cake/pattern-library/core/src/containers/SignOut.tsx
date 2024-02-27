"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import styles from "./AppHeader.module.scss";

export function SignOut() {
  const router = useRouter();
  const { isLoaded, signOut } = useAuth();
  function onClick() {
    if (!isLoaded) {
      return;
    }
    signOut();
    router.push("/");
  }
  return (
    <a onClick={onClick} className={styles.signOut}>
      Sign Out
    </a>
  );
}