import { getBrandPassOffer } from "@danklabs/cake/services/admin-service";
import Link from "next/link";
import { Suspense } from "react";
import { UploadCodes } from "./UploadCodes";
import { createCodes } from "../../actions";
import { CodeUsage } from "./CodeUsage";

type OfferPageProps = { brandSlug: string; templateId: string };
export async function BrandOfferPage(props: OfferPageProps) {
  return (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
}

async function Loading() {
  return <div>Loading...</div>;
}

async function Component({ brandSlug, templateId }: OfferPageProps) {
  const offer = await getBrandPassOffer(templateId);
  if (!offer) {
    throw new Error("no offer");
  }
  return (
    <div>
      <div>
        <h1>Offer: {offer?.offerType}</h1>
        <h3>
          Brand:{" "}
          <Link href={`/admin/brands/${offer.brand.slug}`}>
            {offer.brand.slug}
          </Link>
        </h3>
      </div>
      <div>
        <CodeUsage templateId={templateId} />
      </div>
      <div className="mt-10">
        <UploadCodes
          createCodesAction={createCodes.bind(undefined, brandSlug, templateId)}
        />
      </div>
    </div>
  );
}
