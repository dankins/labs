import { brands, db } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export async function getBrand(slug: string) {
  const brand = await db.query.brands.findFirst({
    where: eq(brands.slug, slug),
  });
  if (!brand) {
    throw new Error("not found");
  }
  return brand!;
}

export const getDbBrand = getBrand;
