import { BrandPass } from "@danklabs/cake/members/dashboard";

export default function Page({
  params,
  searchParams,
}: {
  params: { brandSlug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return <BrandPass brandSlug={params.brandSlug} />;
}
