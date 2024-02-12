"use client";

import { UserButton } from "@clerk/nextjs";

export function NavDropdown({ isAdmin }: { isAdmin: boolean }) {
  return <UserButton afterSignOutUrl={"/"} />;
}
