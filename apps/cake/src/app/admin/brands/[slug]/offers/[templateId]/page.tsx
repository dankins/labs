import { OfferPage } from "@danklabs/cake/admin/brands";
import { PageContent } from "@danklabs/pattern-library/core";

export default function ({
  params,
}: {
  params: { slug: string; templateId: string };
}) {
  return (
    <PageContent>
      <OfferPage brandSlug={params.slug} templateId={params.templateId} />
    </PageContent>
  );
}
