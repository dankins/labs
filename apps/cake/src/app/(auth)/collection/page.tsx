import { MemberDashboard } from "@danklabs/cake/members/dashboard";

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return <MemberDashboard searchParams={searchParams} />;
}
