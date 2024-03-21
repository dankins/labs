import { unstable_cache } from "next/cache";
import { getDbBrand } from "./getBrand";
import { getBrandAdmin } from "@danklabs/cake/cms";

export async function getBrandDetail(slug: string) {
  console.log(
    "calling getBrandDetail - this is aggresively cached so you should not see this very often"
  );
  const [db, cms] = await Promise.all([getDbBrand(slug), getBrandAdmin(slug)]);
  return { db, cms };
}

export async function cachedGetBrandDetail(slug: string) {
  return unstable_cache(getBrandDetail, ["get-brand-detail"], {
    tags: [`get-brand-detail-${slug}`],
  })(slug);
}

export function getBrandDetail_tag(slug: string) {
  return `get-brand-detail-${slug}`;
}
