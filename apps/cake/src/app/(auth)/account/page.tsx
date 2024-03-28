import { AccountPage } from "@danklabs/cake/members/account";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <AccountPage />;
}
