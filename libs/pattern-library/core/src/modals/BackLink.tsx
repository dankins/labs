"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function BackLink({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <a
      onClick={() => {
        router.back();
      }}
    >
      {children}
    </a>
  );
}
