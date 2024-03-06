import { inArray } from "drizzle-orm";
import { unstable_cache } from "next/cache";

import { brands, db } from "@danklabs/cake/db";
import { getBrandsNoCount } from "@danklabs/cake/cms";

export async function getBrandsBySlug(slugs: string[]) {
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

export const cachedGetBrandsBySlug = unstable_cache(
  getBrandsBySlug,
  ["get-brands-by-slug"],
  {
    revalidate: 60,
  }
);
