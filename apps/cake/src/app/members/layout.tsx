import { PageWithNavbar } from "@danklabs/pattern-library/core";
import { Nav } from "./Nav";
import Link from "next/link";
import { AppShell } from "@danklabs/cake/pattern-library/core";
import { HeaderAuth } from "../HeaderAuth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppShell authComponent={<HeaderAuth />}>{children}</AppShell>;
}
