import {
  db,
  passes,
  brands,
  members,
  passports,
  offers,
  offerCodes,
  brandOfferTemplates,
} from "@danklabs/cake/db";
import { and, inArray, eq } from "drizzle-orm";

export async function getBrandsWithOffers(brandSlugs: string[]) {
  return db
    .select()
    .from(brands)
    .innerJoin(brandOfferTemplates, eq(brands.id, brandOfferTemplates.brandId))
    .where(
      and(
        inArray(brands.slug, brandSlugs),
        eq(brandOfferTemplates.offerType, "voucher")
      )
    );
}
