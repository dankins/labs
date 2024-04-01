import { brands, db } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";
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

function tag(slug: string) {
  return `get-brand-offers-${slug}`;
}

export async function cachedGetBrandOffers(slug: string) {
  const fn = unstable_cache(getBrandOffers, [tag(slug)], {
    tags: [tag(slug)],
  });

  return fn(slug);
}

export function clearCacheBrandOffers(slug: string) {
  revalidateTag(tag(slug));
}
