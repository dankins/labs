import { cachedGetBrandOffers } from "libs/cake/services/admin-service/src/brands/getBrandOffers";
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
  const offers = await cachedGetBrandOffers(slug);
  return <div>offers page stub</div>;
}
