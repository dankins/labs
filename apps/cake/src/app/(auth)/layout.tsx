import { AppShell } from "@danklabs/cake/pattern-library/core";
import { HeaderAuth } from "./HeaderAuth";
import { ClerkProvider } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <AppShell authComponent={<HeaderAuth />}>{children}</AppShell>
    </ClerkProvider>
  );
}
