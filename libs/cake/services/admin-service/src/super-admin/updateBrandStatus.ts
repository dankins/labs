import { db, brands } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { getBrandDetail_tag, getBrands_tags } from "../brands";

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

  getBrands_tags.forEach(revalidateTag);
  revalidateTag(getBrandDetail_tag(slug));
}
