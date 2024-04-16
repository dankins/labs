import { db, offerCodes } from "@danklabs/cake/db";
import { count } from "console";
import { and, countDistinct, eq } from "drizzle-orm";

export async function getOfferCodeUsage(templateId: string) {
  return db
    .select({
      used: countDistinct(offerCodes.offerId),
      total: countDistinct(offerCodes.id),
    })
    .from(offerCodes)
    .where(eq(offerCodes.templateId, templateId))
    .then((result) => result[0]);
}
