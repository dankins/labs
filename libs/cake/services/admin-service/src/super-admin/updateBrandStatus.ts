import { db, brands } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { clearGetBrandsCache } from "../brands/getBrands";
import { clearBrandCache } from "../brands/getBrand";

export async function updateBrandStatus(
  slug: string,
  status: "active" | "draft" | "paused" | "deactivated"
) {
  console.log("updateBrandStatus", slug, status);
  await db
    .update(brands)
    .set({
      status,
    })
    .where(eq(brands.slug, slug));

  clearGetBrandsCache();
  clearBrandCache(slug);
}
