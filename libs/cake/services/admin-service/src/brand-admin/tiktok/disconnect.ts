import { BrandSettings, brands, db } from "@danklabs/cake/db";
import { eq, sql } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { clearBrandCache } from "../../brands/getBrand";

export async function disconnect(slug: string) {
  const path = `{"tiktok"}`;
  const value: BrandSettings["tiktok"] = { status: "deactivated" };
  await db
    .update(brands)
    .set({
      settings: sql`jsonb_set(settings, ${path}, ${value}, true)`,
      updatedAt: new Date(),
    })
    .where(eq(brands.slug, slug));

  clearBrandCache(slug);
}
