import { BrandPage } from "@danklabs/cake/members/brands";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return <BrandPage slug={params.slug} />;
}
