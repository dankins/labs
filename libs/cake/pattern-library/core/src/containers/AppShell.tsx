import Link from "next/link";
import { BrandsIcon, MembersIcon, WalletIcon } from "../icons";
import { LogoIcon } from "../logos";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <AppHeader />
      <AppContent>{children}</AppContent>
      <AppFooter />
    </div>
  );
}

function AppHeader() {
  return (
    <header className="sticky z-40 h-[84px] px-3 flex flex-row items-center gap-3">
      <LogoIcon />
      <Link href="/">Cake</Link>
    </header>
  );
}

function AppContent({ children }: { children: React.ReactNode }) {
  return <main className="px-5 grow overflow-y-scroll">{children}</main>;
}

function AppFooter() {
  return (
    <footer className="fixed bottom-0 z-40 px-10 py-5">
      <div className="bg-white rounded-3xl border border-radius flex flex-row gap-4 justify-center items-center">
        <Link href="/members" className="px-10 py-5">
          <WalletIcon />
        </Link>
        <Link href="/" className="px-10 py-5">
          <BrandsIcon />
        </Link>
        <Link href="/" className="px-10 py-5">
          <MembersIcon />
        </Link>
      </div>
    </footer>
  );
}
