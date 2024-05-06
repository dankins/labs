import { inArray } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { makeSafeQueryRunner, q, sanityImage, TypeFromSelection } from "groqd";
import { sanityClient } from "@danklabs/integrations/sanitycms";

import { brands, db } from "@danklabs/cake/db";
import { Brand } from "./types";
import { brandSelection } from "./sanityQueries";

export async function fn(slugs: string[]) {
  console.log("calling getBrandsBySlug", { slugs });
  const dbBrands = await db.query.brands.findMany({
    where: inArray(brands.slug, slugs),
  });

  const cmsBrands = await getBrandsNoCount({ slugs });

  const result: {
    [key: string]: Brand;
  } = {};

  dbBrands.forEach((db, i) => {
    if (!result[db.slug]) {
      result[db.slug] = { db };
    }
    result[db.slug].db = db;

    const cms = cmsBrands[i];
    if (cms) {
      if (!result[cms.slug]) {
        result[cms.slug] = { db, cms };
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
async function getBrandsNoCount(filter?: GetBrandsFilter) {
  let query = q(`*[_type=="brand"]`, { isArray: true });
  if (filter?.slugs) {
    // @ts-ignore
    query = query.filter("slug.current in $slugs");
  }

  return runQuery(query.grab(brandSelection), filter);
}
