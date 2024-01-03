import { Suspense } from "react";
import {
  getBrandAdminData,
  AdminBrandData,
} from "@danklabs/cake/services/admin-service";

export function BrandPage({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<Loading />}>
      <Loaded slug={slug} />
    </Suspense>
  );
}

function Loading() {
  return <div>Loading</div>;
}

async function Loaded({ slug }: { slug: string }) {
  const brand = await getBrandAdminData(slug);

  return (
    <div>
      <h1>{brand.cmsData.name}</h1>
      <OfferTemplates offerTemplates={brand.offerTemplates} />
    </div>
  );
}

async function OfferTemplates({
  offerTemplates,
}: {
  offerTemplates: AdminBrandData["offerTemplates"];
}) {
  return (
    <div>
      <h1>Offers</h1>
      <div>
        {offerTemplates.map((ot) => (
          <div key={ot.id}>{ot.offerType}</div>
        ))}
      </div>
    </div>
  );
}
