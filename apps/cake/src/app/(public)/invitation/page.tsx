import { PageWithNavbar } from "@danklabs/pattern-library/core";
import { Foyer } from "@danklabs/cake/foyer";
import { ClerkProvider } from "@clerk/nextjs";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <ClerkProvider>
      <PageWithNavbar>
        <Foyer searchParams={searchParams} />
      </PageWithNavbar>
    </ClerkProvider>
  );
}
