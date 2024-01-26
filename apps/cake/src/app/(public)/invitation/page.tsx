import { PageWithNavbar } from "@danklabs/pattern-library/core";
import { Lobby } from "@danklabs/cake/lobby";
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
        <Lobby searchParams={searchParams} />
      </PageWithNavbar>
    </ClerkProvider>
  );
}
