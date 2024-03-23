import { ClerkProvider } from "@clerk/nextjs";
import { AppShell } from "@danklabs/cake/pattern-library/core";
import { Patissier } from "./Patissier";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Patissier />
      <AppShell authComponent={<></>}>{children}</AppShell>
    </ClerkProvider>
  );
}
