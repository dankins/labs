import { db, brands } from "@danklabs/cake/db";
import { eq, inArray, sql } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";
import { makeSafeQueryRunner, q, sanityImage, TypeFromSelection } from "groqd";
import { sanityClient } from "@danklabs/integrations/sanitycms";
import { Brand } from "./types";
import { brandSelection } from "./sanityQueries";

export type GetBrandsSortOptions = "popular" | "asc" | "desc";

async function fn(
  perspective: "member" | "admin",
  sort: GetBrandsSortOptions = "popular"
): Promise<Brand[]> {
  console.log("get brands", perspective);
  let whereFilter = eq(brands.status, "active");
  if (perspective === "admin") {
    whereFilter = eq(sql`1`, sql`1`);
  }

  const dbBrands = await db.query.brands.findMany({
    where: whereFilter,
    with: {
      offerTemplates: true,
    },
  });

  const cmsBrandsPromise = getBrandsNoCount();
  const dbBrandMap = dbBrands.reduce((acc, brand) => {
    acc[brand.slug] = brand;
    return acc;
  }, {} as { [slug: string]: (typeof dbBrands)[0] });

  const cmsBrands = await cmsBrandsPromise;
  let rtn: Brand[] = [];
  cmsBrands.forEach((cmsBrand) => {
    const dbBrand = dbBrandMap[cmsBrand.slug];
    if (dbBrand) {
      rtn.push({ db: dbBrand, cms: cmsBrand });
    }
    delete dbBrandMap[cmsBrand.slug];
  });

  // these exist in the DB but not the CMS
  Object.keys(dbBrandMap).forEach((slug) => {
    rtn.push({
      db: dbBrandMap[slug],
    });
  });

  return rtn;
}

export async function getBrands(
  perspective: string,
  sort: "asc" | "desc" = "asc",
  managerBrands?: string[]
) {
  if (perspective === "admin") {
    return unstable_cache(fn, [`get-brands-admin`], {
      tags: [`get-brands-admin`],
    })("admin", sort);
  } else if (perspective === "brand-manager" && managerBrands) {
    const brandAdminFn = unstable_cache(fn, [`get-brands-admin`], {
      tags: [`get-brands-admin`],
    });

    const brands = await brandAdminFn("admin", sort);
    return brands.filter(
      (brand) =>
        brand.db.status === "active" || managerBrands.includes(brand.db.slug)
    );
  }

  return unstable_cache(fn, [`get-brands-member`], {
    tags: [`get-brands-member`],
  })("member", sort);
}

const getBrands_tags = ["get-brands-admin", "get-brands-member"];

export function clearGetBrandsCache() {
  revalidateTag("get-brands-admin");
  revalidateTag("get-brands-member");
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
  let query = q(`*[_type=="brand"]|order(orderRank)`, { isArray: true });
  if (filter?.slugs) {
    // @ts-ignore
    query = query.filter("slug.current in $slugs");
  }

  return runQuery(query.grab(brandSelection), filter);
}
