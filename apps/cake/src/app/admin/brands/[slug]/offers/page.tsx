import { OffersPage } from "@danklabs/cake/admin";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return <OffersPage slug={params.slug} searchParams={searchParams} />;
}
