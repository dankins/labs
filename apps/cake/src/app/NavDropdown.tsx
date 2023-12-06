"use client";
import { Dropdown } from "flowbite-react";

import { UserButton, useOrganizationList } from "@clerk/nextjs";
import { DropdownMenu } from "@danklabs/pattern-library/core";
import { OrganizationMembership } from "@clerk/nextjs/dist/types/server";
import Link from "next/link";
import { useMemo } from "react";

export function NavDropdown({ isAdmin }: { isAdmin: boolean }) {
  return <UserButton afterSignOutUrl={"/"} />;
}
