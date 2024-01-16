import { PageWithNavbar } from "@danklabs/pattern-library/core";
import { Lobby } from "@danklabs/cake/lobby";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <PageWithNavbar>
      <Lobby searchParams={searchParams} />
    </PageWithNavbar>
  );
}
