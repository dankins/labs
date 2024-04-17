"use client";

import { UserButton } from "@clerk/nextjs";

export function UserSection() {
  return (
    <div className="p-4">
      <UserButton afterSignOutUrl={"/"} />
    </div>
  );
}
