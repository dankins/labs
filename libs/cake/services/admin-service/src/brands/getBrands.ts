import { BrandListSelection, getBrandsNoCount } from "@danklabs/cake/cms";
import { db, Brand, brands } from "@danklabs/cake/db";
import { eq, inArray, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export type CakeBrand = Brand & BrandListSelection;

export type GetBrandsSortOptions = "popular" | "asc" | "desc";

async function getBrands(
  perspective: "member" | "admin",
  sort: GetBrandsSortOptions = "popular"
): Promise<CakeBrand[]> {
  console.log("get brands", perspective);
  let whereFilter = eq(brands.status, "active");
  if (perspective === "admin") {
    whereFilter = eq(sql`1`, sql`1`);
  }

  let dbBrands: Brand[];
  dbBrands = await db.query.brands.findMany({
    where: whereFilter,
  });

  const cmsBrandsPromise = getBrandsNoCount();
  const dbBrandMap = dbBrands.reduce((acc, brand) => {
    acc[brand.slug] = brand;
    return acc;
  }, {} as { [slug: string]: Brand });

  const cmsBrands = await cmsBrandsPromise;

  let rtn: CakeBrand[] = [];
  cmsBrands.forEach((brand) => {
    const dbBrand = dbBrandMap[brand.slug];
    if (dbBrand) {
      rtn.push({ ...brand, ...dbBrand });
    }
    delete dbBrandMap[brand.slug];
  });

  // these exist in the DB but not the CMS
  Object.keys(dbBrandMap).forEach((slug) => {
    rtn.push({
      ...dbBrandMap[slug],
      logoSquare: null,
      passLogo: null,
      passBackground: null,
    });
  });

  return rtn;
}

export async function cachedGetBrands(
  perspective: string,
  sort: "asc" | "desc" = "asc",
  managerBrands?: string[]
) {
  if (perspective === "admin") {
    const fn = unstable_cache(getBrands, [`get-brands-admin`], {
      tags: [`get-brands-admin`],
    });

    return fn("admin", sort);
  } else if (perspective === "brand-manager" && managerBrands) {
    const fn = unstable_cache(getBrands, [`get-brands-admin`], {
      tags: [`get-brands-admin`],
    });

    const brands = await fn("admin", sort);
    return brands.filter(
      (brand) => brand.status === "active" || managerBrands.includes(brand.slug)
    );
  }

  const fn = unstable_cache(getBrands, [`get-brands-member`], {
    tags: [`get-brands-member`],
  });

  return fn("member", sort);
}

export const getBrands_tags = ["get-brands-admin", "get-brands-member"];
