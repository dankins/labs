import { revalidateTag, unstable_cache } from "next/cache";
import { db, brands } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { makeSafeQueryRunner, q, sanityImage, Selection } from "groqd";
import { sanityClient } from "@danklabs/integrations/sanitycms";
import { Brand } from "./types";
import { brandSelection } from "./sanityQueries";

export async function fn(slug: string): Promise<Brand> {
  console.log(
    "calling getBrandDetail - this is aggresively cached so you should not see this very often",
    slug
  );
  const [db, cms] = await Promise.all([getDbBrand(slug), getBrandAdmin(slug)]);
  return { db, cms };
}

export async function getBrand(slug: string) {
  return unstable_cache(fn, [getBrand_tag(slug)], {
    tags: [getBrand_tag(slug)],
  })(slug);
}

function getBrand_tag(slug: string) {
  return `get-brand-detail-${slug}`;
}

export function clearBrandCache(slug: string) {
  revalidateTag(getBrand_tag(slug));
}

async function getDbBrand(slug: string) {
  const brand = await db.query.brands.findFirst({
    where: eq(brands.slug, slug),
    with: {
      offerTemplates: true,
    },
  });
  if (!brand) {
    throw new Error("not found");
  }
  return brand;
}

const runQuery = makeSafeQueryRunner(
  (q: string, params: Record<string, number | string> = {}) =>
    sanityClient.fetch(q, {
      ...params,
    })
);

async function getBrandAdmin(slug: string) {
  return runQuery(
    q(`*[_type=="brand"][slug.current==$slug]`)
      .filter(`_type == "brand"`)
      .grab(brandSelection)
      .slice(0, 1),
    { slug }
  ).then((x) => {
    if (x.length === 0) {
      throw new Error(`Brand not found`);
    }
    return x[0];
  });
}
