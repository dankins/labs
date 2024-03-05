import { AppShell } from "@danklabs/cake/pattern-library/core";
import { ClerkProvider } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <AppShell authComponent={<></>}>{children}</AppShell>
    </ClerkProvider>
  );
}
