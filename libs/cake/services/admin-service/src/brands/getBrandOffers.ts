import { unstable_cache } from "next/cache";
export async function getBrandOffers(slug: string) {
  return -1;
}

export async function cachedGetBrandOffers(slug: string) {
  const fn = unstable_cache(getBrandOffers, [`get-brand-offers-${slug}`], {
    tags: [`get-brand-offers-${slug}`],
  });

  return fn(slug);
}
