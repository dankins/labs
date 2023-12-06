import { Centered, PageContent } from "@danklabs/pattern-library/core";
import { BrandPage } from "@danklabs/cake/admin/brands";

export default function ({ params }: { params: { slug: string } }) {
  return (
    <PageContent>
      <Centered>
        <BrandPage slug={params.slug} />
      </Centered>
    </PageContent>
  );
}
