import { MemberDetail } from "@danklabs/cake/admin/members";

export default function Page({
  params,
  searchParams,
}: {
  params: { iam: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return <MemberDetail iam={params.iam} />;
}
