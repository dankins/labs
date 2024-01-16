import { AppShell } from "@danklabs/cake/pattern-library/core";
import { HeaderAuth } from "./HeaderAuth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppShell authComponent={<HeaderAuth />}>{children}</AppShell>;
}
