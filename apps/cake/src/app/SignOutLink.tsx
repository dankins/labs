"use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function SignOutLink({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { signOut } = useClerk();
  const router = useRouter();

  function handleClick() {
    signOut(() => router.push("/"));
  }
  return (
    <a href="#" onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
