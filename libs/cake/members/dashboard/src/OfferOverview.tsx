import { auth } from "@clerk/nextjs";
import { PassportBrandsSelection, getBrandAdmin } from "@danklabs/cake/cms";
import { getBrandPassOffers } from "@danklabs/cake/services/admin-service";
import { CopyIcon } from "@danklabs/pattern-library/core";
import { Carousel } from "@danklabs/pattern-library/motion";

type Offer = Awaited<ReturnType<typeof getBrandPassOffers>>[0];

export async function OfferOverview({
  brand,
}: {
  brand: PassportBrandsSelection;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("not authenticated");
  }
  const [offers, cmsData] = await Promise.all([
    getBrandPassOffers(userId, brand.slug),
    getBrandAdmin(brand.slug),
  ]);
  return (
    <div>
      <h1>My Offers</h1>
      <div>
        <Carousel>
          {offers.map((o, idx) => (
            <OfferCard key={idx} offer={o} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export function OfferCard({ offer }: { offer: Offer }) {
  const code = offer.offer_codes?.code || "";
  return (
    <div className="p-3 h-24 w-64 bg-white rounded text-black">
      <h1 className="text-2xl">Cake Pass</h1>
      <div className="flex flex-row text-xl gap-2 items-center">
        <span className="">{code}</span>
        <CopyIcon text={code} />
      </div>
    </div>
  );
}
