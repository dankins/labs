import { getBrandAdmin } from "@danklabs/cake/cms";
import { brands, db } from "@danklabs/cake/db";

export async function getBrandAdminData(slug: string) {
  const [dbData, cmsData] = await Promise.all([
    db.query.brands
      .findFirst({
        where: (brand, { eq }) => eq(brand.slug, slug),
        with: {
          offerTemplates: true,
        },
      })
      .then(async (b) => {
        if (!b) {
          // brand doesn't exist in the database, but maybe it exists in the CMS
          const cmsBrand = await getBrandAdmin(slug);
          if (cmsBrand) {
            await db.insert(brands).values([
              {
                slug,
              },
            ]);
          }
          throw new Error("unable to find brand");
        }
        return b;
      }),
    getBrandAdmin(slug),
  ]);

  return { ...dbData, cmsData };
}

export type AdminBrandData = Awaited<ReturnType<typeof getBrandAdminData>>;
