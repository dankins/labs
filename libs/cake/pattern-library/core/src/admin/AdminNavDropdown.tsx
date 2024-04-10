"use client";

import { UserButton } from "@clerk/nextjs";

export function AdminNavDropdown({ isAdmin }: { isAdmin: boolean }) {
  return <UserButton afterSignOutUrl={"/"} />;
}
