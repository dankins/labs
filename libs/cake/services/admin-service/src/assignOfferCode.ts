import { db, Offer, offerCodes } from "@danklabs/cake/db";
import { and, eq, isNull } from "drizzle-orm";
import { DbTransactiontype } from "./types";

export async function assignOfferCode(tx: typeof db, offer: Offer) {
  const offerCode = await tx.query.offerCodes.findFirst({
    where: and(
      eq(offerCodes.templateId, offer.templateId),
      isNull(offerCodes.offerId) // make sure offer_id is not already assigned
    ),
  });

  if (!offerCode) {
    throw new Error("unable to assign offer code");
  }

  return tx
    .update(offerCodes)
    .set({
      offerId: offer.id,
    })
    .where(eq(offerCodes.id, offerCode.id));
}
