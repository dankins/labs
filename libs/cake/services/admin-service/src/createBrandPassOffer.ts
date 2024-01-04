import { brandOfferTemplates, db } from "@danklabs/cake/db";

export async function createBrandPassOffer(
  brandId: string,
  applyOnPassCreation: boolean
) {
  const template: typeof brandOfferTemplates.$inferInsert = {
    brandId,
    applyOnPassCreation,
    offerType: "voucher",
  };
  const reuslt = await db.insert(brandOfferTemplates).values([template]);
}
