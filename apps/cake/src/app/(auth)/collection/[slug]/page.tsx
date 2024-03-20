import {
  CollectionItemInterceptModal,
  MemberDashboard,
} from "@danklabs/cake/members/dashboard";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <MemberDashboard />
      <CollectionItemInterceptModal slug={params.slug} />
    </>
  );
}
