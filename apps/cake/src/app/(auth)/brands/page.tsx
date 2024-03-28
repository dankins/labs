import { BrandsPage } from "@danklabs/cake/members/brands";
import { MobileNavSpacer } from "@danklabs/cake/pattern-library/core";

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <MobileNavSpacer />
      <BrandsPage
        sort={searchParams && (searchParams["sort"] as string)}
        perspective={searchParams && (searchParams["perspective"] as string)}
      />
    </>
  );
}
