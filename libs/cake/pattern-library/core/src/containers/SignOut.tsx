"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { signOutAction } from "./actions";

export function SignOut({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const { isLoaded, signOut } = useAuth();

  function onClick() {
    if (!isLoaded) {
      return;
    }
    signOut(async () => {
      await signOutAction();
      router.refresh();
      router.push("/");
    });
  }
  return (
    <a onClick={onClick} className={className}>
      {children}
    </a>
  );
}
