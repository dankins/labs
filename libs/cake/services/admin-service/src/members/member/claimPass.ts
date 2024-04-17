import { brands, passports, db } from "@danklabs/cake/db";
import { trackBrandAddedToCollection } from "@danklabs/cake/events";
import { revalidatePath } from "next/cache";
import { createBrandPass } from "../../createBrandPass";
import { getMember } from "./getMember";
import { eq } from "drizzle-orm";
import { clearCache } from "./clearCache";

export async function claimPass(iam: string, brandSlug: string) {
  const member = await getMember(iam);
  if (!member) {
    throw new Error("could not find member");
  }

  const passport = await db.query.passports.findFirst({
    where: eq(passports.memberId, member.id),
  });
  if (!passport) {
    throw new Error("could not find passport");
  }

  const passportId = passport.id;
  console.log("claim pass", iam, brandSlug, passportId);
  if (!passportId) {
    throw new Error("unknown passport id");
  }
  await db.transaction(async (tx) => {
    await createBrandPass(tx, passportId, brandSlug);
  });

  const newBrandSlugs = member.collection.brandSlugs.concat([brandSlug]);

  trackBrandAddedToCollection(iam, brandSlug, newBrandSlugs);

  // revalidatePath("/collection");
  revalidatePath("/brands");
  revalidatePath(`/brands/${brandSlug}`);

  clearCache(iam);

  return true;
}
