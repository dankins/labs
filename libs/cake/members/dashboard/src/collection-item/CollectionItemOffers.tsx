import { auth } from "@clerk/nextjs/server";
import { Heading4, SectionHeading } from "@danklabs/cake/pattern-library/core";
import { members } from "@danklabs/cake/services/admin-service";
import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";
import { Suspense } from "react";
import { OfferCard } from "./OfferCard";

export async function CollectionItemOffers({
  slug,
  shopLinkTemplate,
}: {
  slug: string;
  shopLinkTemplate?: string;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <Component slug={slug} shopLinkTemplate={shopLinkTemplate} />
    </Suspense>
  );
}

function Loading() {
  return (
    <div>
      <Spinner />
    </div>
  );
}

async function Component({
  slug,
  shopLinkTemplate,
}: {
  slug: string;
  shopLinkTemplate?: string;
}) {
  const { userId: iam } = auth().protect();
  const member = await members.member.get(iam);
  const collectionItem = member.collection.itemMap[slug];
  return (
    <div>
      <Heading4>Brand Benefits</Heading4>
      <div className="py-2 px-6">
        {collectionItem.offers.map((offer) => (
          <OfferCard offer={offer} shopLinkTemplate={shopLinkTemplate} />
        ))}
      </div>
    </div>
  );
}
