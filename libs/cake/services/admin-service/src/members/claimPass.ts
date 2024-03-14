import { brands, db } from "@danklabs/cake/db";
import { trackBrandAddedToCollection } from "@danklabs/cake/events";
import { revalidatePath } from "next/cache";
import { createBrandPass } from "../createBrandPass";
import { getMemberByIAM } from "../getMemberByIAM";

export async function claimPass(iam: string, brandSlug: string) {
  const member = await getMemberByIAM(iam);
  if (!member) {
    throw new Error("could not find member");
  }

  const passportId = member.passport.id;
  console.log("claim pass", iam, brandSlug, passportId);
  if (!passportId) {
    throw new Error("unknown passport id");
  }
  await db.transaction(async (tx) => {
    await createBrandPass(tx, passportId, brandSlug);
  });

  const collection = member.passport.passes
    .map((p) => p.brand.slug)
    .concat([brandSlug]);

  trackBrandAddedToCollection(iam, brandSlug, collection);

  revalidatePath("/collection");
  revalidatePath("/brands");
  revalidatePath(`/brands/${brandSlug}`);

  return true;
}
