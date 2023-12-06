import { SideNav } from "../menu";
import { PageContent } from "./PageContent";

export function PageWithNavbar({
  navbar,
  sidenav,
  children,
}: {
  navbar?: React.ReactNode;
  sidenav?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {navbar}
      {sidenav ? (
        <SideNav nav={sidenav}>
          <PageContent>{children}</PageContent>
        </SideNav>
      ) : (
        <PageContent>{children}</PageContent>
      )}
    </>
  );
}
