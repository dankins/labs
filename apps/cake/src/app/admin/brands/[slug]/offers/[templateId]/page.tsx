import { BrandOfferPage } from "@danklabs/cake/admin";
import { PageContent } from "@danklabs/pattern-library/core";

export default function ({
  params,
}: {
  params: { slug: string; templateId: string };
}) {
  return (
    <PageContent>
      <BrandOfferPage brandSlug={params.slug} templateId={params.templateId} />
    </PageContent>
  );
}
