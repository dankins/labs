import { PageWithNavbar } from "@danklabs/pattern-library/core";
import { Nav } from "../Nav";
import { SideNav } from "./SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageWithNavbar navbar={<Nav />} sidenav={<SideNav />}>
      {children}
    </PageWithNavbar>
  );
}
