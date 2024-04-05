import { brandOfferTemplates, brands, db } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { clearCacheBrandOffers } from "../brand/getBrandOffers";
export async function createBrandPassOffer(
  brandSlug: string,
  input: Omit<
    typeof brandOfferTemplates.$inferInsert,
    "id" | "createdAt" | "updatedAt" | "brandId"
  >
) {
  const brand = await db.query.brands.findFirst({
    where: eq(brands.slug, brandSlug),
  });
  if (!brand) {
    throw new Error("unable to find brand");
  }

  const template: typeof brandOfferTemplates.$inferInsert = {
    brandId: brand.id,
    ...input,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await db.insert(brandOfferTemplates).values(template);

  clearCacheBrandOffers(brandSlug);
}
