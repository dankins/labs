import { Heading3, Paragraph3 } from "@danklabs/pattern-library/core";
import { cachedGetBrandOffers } from "libs/cake/services/admin-service/src/brands/getBrandOffers";
import Link from "next/link";
import { Suspense } from "react";

export async function OffersPage({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<Loading />}>
      <Component slug={slug} />
    </Suspense>
  );
}

function Loading() {
  return <div>Loading...</div>;
}

async function Component({ slug }: { slug: string }) {
  const brandWithOffers = await cachedGetBrandOffers(slug);
  return (
    <div>
      <div>
        {brandWithOffers.offerTemplates.map((ot) => (
          <div>
            <Link href={`/admin/brands/ganni/offers/${ot.id}`}>
              {ot.name ? (
                <Heading3>{ot.name}</Heading3>
              ) : (
                <Paragraph3>No Name</Paragraph3>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
