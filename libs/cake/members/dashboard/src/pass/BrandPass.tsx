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
  const offers = result.filter((r) => r.offers !== null).map((r) => r.offers);
  return (
    <div>
      <div>Pass: {brand.slug}</div>
      <div>
        {offers.map((o) => (
          <OfferRow offer={o!} />
        ))}
      </div>
    </div>
  );
}

function OfferRow({
  offer,
}: {
  offer: NonNullable<
    Awaited<ReturnType<typeof getBrandPassOffers>>[0]["offers"]
  >;
}) {
  return <div>Offer: {offer.id}</div>;
}
