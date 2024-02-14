import Link from "next/link";
import { BrandsIcon, MembersIcon, WalletIcon } from "../icons";
import { LogoIcon } from "../logos";
import { AppHeader } from "./AppHeader";

export function AppShell({
  authComponent,
  children,
}: {
  children: React.ReactNode;
  authComponent?: React.ReactNode;
}) {
  return (
    <>
      <AppHeader authComponent={authComponent} />{" "}
      <div className="flex flex-row justify-center">
        <div className="container">
          <AppContent>{children}</AppContent>
          <AppFooter />
        </div>
      </div>
    </>
  );
}

function AppContent({ children }: { children: React.ReactNode }) {
  return <main className="grow">{children}</main>;
}

function AppFooter() {
  return <footer></footer>;
  // return (
  //   <footer className="fixed bottom-0 z-40 px-10 py-5">
  //     <div className="bg-white rounded-3xl border border-radius flex flex-row gap-4 justify-center items-center">
  //       <Link href="/members" className="px-10 py-5">
  //         <WalletIcon />
  //       </Link>
  //       <Link href="/" className="px-10 py-5">
  //         <BrandsIcon />
  //       </Link>
  //       <Link href="/" className="px-10 py-5">
  //         <MembersIcon />
  //       </Link>
  //     </div>
  //   </footer>
  // );
}
