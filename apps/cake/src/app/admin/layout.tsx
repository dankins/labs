import { PageWithNavbar } from "@danklabs/pattern-library/core";
import { Nav } from "./Nav";
import { ClerkProvider } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <div className="flex flex-row">
        <Nav />
        <div className="px-4 grow">{children}</div>
      </div>
    </ClerkProvider>
  );
}
