import { getBrandAdmin } from "@danklabs/cake/cms";
import { db } from "@danklabs/cake/db";

export async function getBrandAdminData(slug: string) {
  const [dbData, cmsData] = await Promise.all([
    db.query.brands
      .findFirst({
        where: (brand, { eq }) => eq(brand.slug, slug),
        with: {
          offerTemplates: true,
        },
      })
      .then((b) => {
        if (!b) {
          throw new Error("unable to find brand");
        }
        return b;
      }),
    getBrandAdmin(slug),
  ]);

  return { ...dbData, cmsData };
}

export type AdminBrandData = Awaited<ReturnType<typeof getBrandAdminData>>;
