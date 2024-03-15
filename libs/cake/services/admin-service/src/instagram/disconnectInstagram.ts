import { BrandSettings, brands, db } from "@danklabs/cake/db";
import { eq, sql } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function disconnectInstagram(slug: string) {
  const path = `{"instagram"}`;
  const value: BrandSettings["instagram"] = { status: "deactivated" };
  await db
    .update(brands)
    .set({
      settings: sql`jsonb_set(settings, ${path}, ${value}, true)`,
    })
    .where(eq(brands.slug, slug));
  revalidateTag(`get-brand-detail-${slug}`);
}
