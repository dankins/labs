import { BrandsPage } from "@danklabs/cake/members/brands";

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <BrandsPage searchParams={searchParams} />
    </>
  );
}
