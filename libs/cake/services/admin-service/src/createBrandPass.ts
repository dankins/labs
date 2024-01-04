import { db, brands, passes, offers } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { assignOfferCode } from "./assignOfferCode";

type DbTransactiontype = Parameters<Parameters<typeof db.transaction>[0]>[0];

export async function createBrandPass(
  tx: DbTransactiontype,
  passportId: string,
  brandSlug: string
): Promise<void> {
  // find brand by slug
  const brand = await tx.query.brands.findFirst({
    where: eq(brands.slug, brandSlug),
    with: {
      offerTemplates: true,
    },
  });
  if (!brand) {
    throw new Error("could not find brand with slug");
  }

  // create create pass
  const pass = (
    await tx
      .insert(passes)
      .values({
        passportId,
        brandId: brand.id,
      })
      .returning()
  )[0];

  // create offers
  const offerValues: Array<typeof offers.$inferInsert> = brand.offerTemplates
    .filter((ot) => ot.applyOnPassCreation)
    .map((brandOfferTemplate) => ({
      passId: pass.id,
      templateId: brandOfferTemplate.id,
      status: "new",
    }));

  if (offerValues.length > 0) {
    const createdOffers = await tx
      .insert(offers)
      .values(offerValues)
      .returning();

    await Promise.all(createdOffers.map((offer) => assignOfferCode(tx, offer)));
  }
}
