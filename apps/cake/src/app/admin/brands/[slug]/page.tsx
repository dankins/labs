import { PageContent } from "@danklabs/pattern-library/core";
import { BrandDashboard } from "@danklabs/cake/admin";

export default function ({ params }: { params: { slug: string } }) {
  return (
    <PageContent>
      <BrandDashboard slug={params.slug} />
    </PageContent>
  );
}
