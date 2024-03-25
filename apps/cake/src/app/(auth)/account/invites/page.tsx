import { InvitationsPage } from "@danklabs/cake/members/invitations";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <InvitationsPage searchParams={searchParams} />;
}
