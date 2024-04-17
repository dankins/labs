import { BrandSettings, brands, db } from "@danklabs/cake/db";
import { eq, sql } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { clearBrandCache } from "../../brands/getBrand";

export async function updateInstagramConfig(
  slug: string,
  accessToken: string,
  userId: string,
  tokenExpirationDate: Date
) {
  const path = `{"instagram"}`;
  const value: BrandSettings["instagram"] = {
    status: "active",
    accessToken,
    userId,
    tokenExpirationDate: tokenExpirationDate.toISOString(),
  };
  await db
    .update(brands)
    .set({
      settings: sql`jsonb_set(settings, ${path}, ${value}, true)`,
      updatedAt: new Date(),
    })
    .where(eq(brands.slug, slug));

  clearBrandCache(slug);
}
