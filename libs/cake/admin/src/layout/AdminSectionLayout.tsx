import { Nav } from "./Nav";
import { ClerkProvider } from "@clerk/nextjs";

export function AdminSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <div className="flex flex-row">
        <Nav />
        <div className="px-4 grow">{children}</div>
        <div className="my-10"></div>
      </div>
    </ClerkProvider>
  );
}
