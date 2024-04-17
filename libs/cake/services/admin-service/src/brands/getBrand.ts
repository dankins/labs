import { revalidateTag, unstable_cache } from "next/cache";
import { db, brands } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { makeSafeQueryRunner, q, sanityImage, Selection } from "groqd";
import { sanityClient } from "@danklabs/integrations/sanitycms";

export async function fn(slug: string) {
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
  getBrand(slug);
}

async function getDbBrand(slug: string) {
  const brand = await db.query.brands.findFirst({
    where: eq(brands.slug, slug),
  });
  if (!brand) {
    throw new Error("not found");
  }
  return brand;
}

export const brandSelection = {
  slug: q.slug("slug"),
  name: q.string().optional().nullable(),
  website: q.string().optional().nullable(),
  summary: q.string().optional().nullable(),
  passLogo: sanityImage("pass_logo").nullable(),
  logoSquare: sanityImage("logo_square", {
    withAsset: ["base", "dimensions", "lqip"],
    withHotspot: true,
    withCrop: true,
  }).nullable(),
  passBackground: sanityImage("pass_background", {
    withAsset: ["base", "dimensions", "lqip"],
    withHotspot: true,
    withCrop: true,
  }).nullable(),
  passBackgroundDesktop: sanityImage("pass_background_desktop", {
    withAsset: ["base", "dimensions", "lqip"],
    withHotspot: true,
    withCrop: true,
  }).nullable(),
  featured: q.string().nullable(),
  products: q(`*[_type == "product" && references(^._id)]`, {
    isArray: true,
  }).grab({
    name: q.string(),
    pdpLink: q.string(),
    price: q.string().optional(),
    image: sanityImage("image", {
      withAsset: ["base", "dimensions", "lqip"],
      withHotspot: true,
      withCrop: true,
    }),
  }),
  // https://www.sanity.io/plugins/color-input
  pass_color: q
    .object({
      hex: q.string(),
      rgb: q.object({
        r: q.number(),
        g: q.number(),
        b: q.number(),
      }),
    })
    .nullable(),
} satisfies Selection;

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
