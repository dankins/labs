import { auth } from "@clerk/nextjs";
import { getBrandPassOffers } from "@danklabs/cake/services/admin-service";

export async function BrandPass({ brandSlug }: { brandSlug: string }) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("not authenticated");
  }
  const result = await getBrandPassOffers(userId, brandSlug);

  const pass = result[0].passes;
  const brand = result[0].brands;
  const offerCode = result[0].offer_codes;
  const offers = result.filter((r) => r.offers !== null).map((r) => r.offers);
  return (
    <div>
      <div>Pass: {brand.slug}</div>
      <div>
        {offers.map((o) => (
          <OfferRow offer={o!} offerCode={offerCode} />
        ))}
      </div>
    </div>
  );
}

function OfferRow({
  offer,
  offerCode,
}: {
  offer: NonNullable<
    Awaited<ReturnType<typeof getBrandPassOffers>>[0]["offers"]
  >;
  offerCode: Awaited<ReturnType<typeof getBrandPassOffers>>[0]["offer_codes"];
}) {
  return (
    <div>
      Offer: {offer.id} |{" "}
      {offerCode?.code && <span>code: {offerCode.code}</span>}
    </div>
  );
}
