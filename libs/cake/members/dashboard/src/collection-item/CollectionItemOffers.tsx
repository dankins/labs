import { auth } from "@clerk/nextjs/server";
import { SectionHeading } from "@danklabs/cake/pattern-library/core";
import { members } from "@danklabs/cake/services/admin-service";
import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";
import { Suspense } from "react";
import { OfferCard } from "./OfferCard";

export async function CollectionItemOffers({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<Loading />}>
      <Component slug={slug} />
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

async function Component({ slug }: { slug: string }) {
  const { userId: iam } = auth().protect();
  const member = await members.member.get(iam);
  const collectionItem = member.collection.itemMap[slug];
  return (
    <div>
      <SectionHeading>Brand Benefits</SectionHeading>
      <div>
        {collectionItem.offers.map((offer) => (
          <OfferCard offer={offer} />
        ))}
      </div>
    </div>
  );
}
