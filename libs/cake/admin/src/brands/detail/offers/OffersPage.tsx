import { getBrandAdmin } from "@danklabs/cake/cms";
import {
  Heading3,
  Paragraph3,
  PrimaryButton,
} from "@danklabs/pattern-library/core";
import { cachedGetBrandOffers } from "libs/cake/services/admin-service/src/brands/getBrandOffers";
import Link from "next/link";
import { Suspense } from "react";
import { CreateOfferModal } from "./CreateOfferModal";

export async function OffersPage({
  slug,
  searchParams,
}: {
  slug: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Suspense fallback={<Loading />}>
      <Component slug={slug} searchParams={searchParams} />
    </Suspense>
  );
}

function Loading() {
  return <div>Loading...</div>;
}

async function Component({
  slug,
  searchParams,
}: {
  slug: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const brandWithOffers = await cachedGetBrandOffers(slug);
  return (
    <div>
      {searchParams && searchParams.action === "create-offer" && (
        <CreateOfferModal slug={slug} />
      )}
      <div className="flex flex-row items-center">
        <Heading3 className="grow">Offers</Heading3>
        <PrimaryButton href={`?action=create-offer`}>
          Create Offer
        </PrimaryButton>
      </div>
      <div>
        {brandWithOffers.offerTemplates.map((ot) => (
          <div key={ot.id}>
            <Link href={`/admin/brands/${slug}/offers/${ot.id}`}>
              {ot.name ? (
                <Heading3>{ot.name}</Heading3>
              ) : (
                <Paragraph3>Unnamed Offer</Paragraph3>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
