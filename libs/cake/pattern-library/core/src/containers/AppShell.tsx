import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";

export function AppShell({
  authComponent,
  children,
}: {
  children: React.ReactNode;
  authComponent?: React.ReactNode;
}) {
  return (
    <>
      <AppHeader authComponent={authComponent} />
      <AppContent>{children}</AppContent>
      <AppFooter />
    </>
  );
}

function AppContent({ children }: { children: React.ReactNode }) {
  return <main className="grow">{children}</main>;
}
