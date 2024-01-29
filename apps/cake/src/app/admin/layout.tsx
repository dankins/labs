import { PageWithNavbar } from "@danklabs/pattern-library/core";
import { Nav } from "../Nav";
import { SideNav } from "./SideNav";
import { ClerkProvider } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <PageWithNavbar navbar={<Nav />} sidenav={<SideNav />}>
        {children}
      </PageWithNavbar>
    </ClerkProvider>
  );
}
