import { db, brandOfferTemplates } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";

export async function getBrandPassOffer(templateId: string) {
  return db.query.brandOfferTemplates.findFirst({
    where: eq(brandOfferTemplates.id, templateId),
    with: {
      brand: true,
    },
  });
}
