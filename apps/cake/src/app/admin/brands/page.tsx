import { InterceptModal, PageContent } from "@danklabs/pattern-library/core";
import { AddBrand, BrandsDashboard } from "@danklabs/cake/admin";

export default function ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      {searchParams?.action === "add" && (
        <InterceptModal returnHref="/admin/brands">
          <AddBrand />
        </InterceptModal>
      )}
      <PageContent>
        <BrandsDashboard />
      </PageContent>
    </>
  );
}
