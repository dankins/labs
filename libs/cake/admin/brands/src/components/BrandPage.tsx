import { Suspense } from "react";
import {
  getBrandAdminData,
  AdminBrandData,
} from "@danklabs/cake/services/admin-service";
import { CreateOffer } from "./offers/CreateOffer";
import Link from "next/link";

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
      <div className="mt-10">
        <h3>Offers:</h3>
        <OfferTemplates
          brandSlug={brand.slug}
          offerTemplates={brand.offerTemplates}
        />
      </div>

      <div className="mt-10">
        <h3>Create Offer:</h3>
        <CreateOffer brandSlug={brand.slug} brandId={brand.id} />
      </div>
    </div>
  );
}

async function OfferTemplates({
  brandSlug,
  offerTemplates,
}: {
  brandSlug: string;
  offerTemplates: AdminBrandData["offerTemplates"];
}) {
  return (
    <ul>
      {offerTemplates.map((ot) => (
        <li key={ot.id} className="ml-5">
          <Link href={`/admin/brands/${brandSlug}/offers/${ot.id}`}>
            {ot.offerType}
          </Link>
        </li>
      ))}
    </ul>
  );
}
