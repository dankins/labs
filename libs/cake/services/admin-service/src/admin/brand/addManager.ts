import { brands, db } from "@danklabs/cake/db";
import { members } from "../../members";
import { eq } from "drizzle-orm";
import { clearBrandCache } from "../../brands/getBrand";

export async function addManager(brandSlug: string, email: string) {
  console.log("addManager", brandSlug, email);

  const brand = await db.query.brands.findFirst({
    where: eq(brands.slug, brandSlug),
  });
  if (!brand) {
    throw new Error(`Brand not found: ${brandSlug}`);
  }

  brand.admins.push({ email, role: "admin" });

  await db
    .update(brands)
    .set({
      admins: brand.admins,
      updatedAt: new Date(),
    })
    .where(eq(brands.slug, brandSlug));

  // const member = await members.member.getOrCreateByEmail(email);
  // members.member.clearCache(member.iam);

  clearBrandCache(brandSlug);

  return true;
}
