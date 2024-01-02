import { auth } from "@clerk/nextjs";
import { getBrandPassOffers } from "@danklabs/cake/services/admin-service";

export async function BrandPass({ brandSlug }: { brandSlug: string }) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("not authenticated");
  }
  const result = await getBrandPassOffers(userId, brandSlug);

  const pass = result[0].passes;
  const offers = result.filter((r) => r.offers !== null).map((r) => r.offers);
  return (
    <div>
      <div>{JSON.stringify(pass)}</div>
      <div>{JSON.stringify(offers)}</div>
    </div>
  );
}
