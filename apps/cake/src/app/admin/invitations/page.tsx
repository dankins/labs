import { InvitationsPage } from "@danklabs/cake/admin";

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return <InvitationsPage searchParams={searchParams} />;
}
