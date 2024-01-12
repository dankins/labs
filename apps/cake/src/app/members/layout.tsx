import { PageWithNavbar } from "@danklabs/pattern-library/core";
import { Nav } from "./Nav";
import Link from "next/link";
import { AppShell } from "@danklabs/cake/pattern-library/core";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
