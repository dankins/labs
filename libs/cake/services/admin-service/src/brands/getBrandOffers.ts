import { brands, db } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
export async function getBrandOffers(slug: string) {
  const brandWithOffers = await db.query.brands.findFirst({
    where: eq(brands.slug, slug),
    with: {
      offerTemplates: true,
    },
  });

  if (!brandWithOffers) {
    throw new Error("brand not found");
  }

  return brandWithOffers;
}

export async function cachedGetBrandOffers(slug: string) {
  const fn = unstable_cache(getBrandOffers, [`get-brand-offers-${slug}`], {
    tags: [`get-brand-offers-${slug}`],
  });

  return fn(slug);
}
