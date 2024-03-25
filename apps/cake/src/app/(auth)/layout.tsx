import { ClerkProvider } from "@clerk/nextjs";
import { AppShell } from "@danklabs/cake/pattern-library/core";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <AppShell authComponent={<></>}>{children}</AppShell>
    </ClerkProvider>
  );
}
