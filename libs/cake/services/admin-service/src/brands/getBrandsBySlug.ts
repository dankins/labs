import { inArray } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { makeSafeQueryRunner, q, sanityImage, TypeFromSelection } from "groqd";
import { sanityClient } from "@danklabs/integrations/sanitycms";

import { brands, db } from "@danklabs/cake/db";

export async function fn(slugs: string[]) {
  console.log("calling getBrandsBySlug", { slugs });
  const dbBrands = await db.query.brands.findMany({
    where: inArray(brands.slug, slugs),
  });

  const cmsBrands = await getBrandsNoCount({ slugs });

  const result: {
    [key: string]: {
      db?: (typeof dbBrands)[0];
      cms?: (typeof cmsBrands)[0];
    };
  } = {};

  dbBrands.forEach((db, i) => {
    if (!result[db.slug]) {
      result[db.slug] = {};
    }
    result[db.slug].db = db;

    const cms = cmsBrands[i];
    if (cms) {
      if (!result[cms.slug]) {
        result[cms.slug] = {};
      }
      result[cms.slug].cms = cms;
    }
  });

  return result;
}

export async function getBrandsBySlug(slugs: string[]) {
  return unstable_cache(fn, ["get-brands-by-slug"], {
    revalidate: 60,
  })(slugs);
}

export const brandListSelection = {
  name: q.string().nullable().optional(),
  slug: q.slug("slug"),
  logoSquare: sanityImage("logo_square").nullable(),
  passLogo: sanityImage("pass_logo").nullable(),
  passBackground: sanityImage("pass_background", {
    withAsset: ["base", "dimensions", "lqip"],
    withHotspot: true,
    withCrop: true,
  }).nullable(),
  // https://www.sanity.io/plugins/color-input
};

export type BrandListSelection = TypeFromSelection<typeof brandListSelection>;

const runQuery = makeSafeQueryRunner(
  (q: string, params: Record<string, number | string | string[]> = {}) =>
    sanityClient.fetch(q, {
      ...params,
    })
);

type GetBrandsFilter = {
  status?: string;
  slugs?: string[];
};
async function getBrands(filter?: GetBrandsFilter) {
  const query = q("*", { isArray: false }).filterByType("brand");
  return runQuery(
    q("").grab({
      brands: query.order("name").grab$(brandListSelection),
      brandCount: q(`count(*[_type == "brand"])`),
    }),
    { status: "any" }
  );
}

async function getBrandsNoCount(filter?: GetBrandsFilter) {
  let query = q(`*[_type=="brand"]`, { isArray: true });
  if (filter?.slugs) {
    // @ts-ignore
    query = query.filter("slug.current in $slugs");
  }

  return runQuery(query.grab(brandListSelection), filter);
}
