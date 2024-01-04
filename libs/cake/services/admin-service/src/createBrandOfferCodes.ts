import { db, offerCodes } from "@danklabs/cake/db";

export async function createBrandOfferCodes(
  templateId: string,
  codes: string[]
) {
  console.log("create codes", templateId, codes);

  const values = codes.map<typeof offerCodes.$inferInsert>((code) => ({
    templateId,
    code,
  }));

  const result = await db.insert(offerCodes).values(values);
}
