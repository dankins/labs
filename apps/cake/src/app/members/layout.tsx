import { PageWithNavbar } from "@danklabs/pattern-library/core";
import { Nav } from "./Nav";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageWithNavbar navbar={<Nav />} sidenav={<SideNav />}>
      {children}
    </PageWithNavbar>
  );
}
function SideNav() {
  return (
    <div className="px-3 flex flex-col gap-2">
      <Link href="/members/passport">Passport</Link>
      <Link href="/members/invitations">Invitations</Link>
    </div>
  );
}
