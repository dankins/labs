import { makeSafeQueryRunner, q, sanityImage, TypeFromSelection } from "groqd";

import { sanityClient } from "@danklabs/integrations/sanitycms";
import { RawCreateParams } from "zod";

const fuck: RawCreateParams = {};
export const passportBrandsSelection = {
  name: q.string(),
  slug: q.slug("slug"),
  logoSquare: sanityImage("logo_square").nullable(),
  passLogo: sanityImage("pass_logo").nullable(),
  passBackground: sanityImage("pass_background", {
    withAsset: ["base", "dimensions", "lqip"],
    withHotspot: true,
    withCrop: true,
  }).nullable(),
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
};

export type PassportBrandsSelection = TypeFromSelection<
  typeof passportBrandsSelection
>;

const runQuery = makeSafeQueryRunner(
  (q: string, params: Record<string, number | string | string[]> = {}) =>
    sanityClient.fetch(q, {
      ...params,
    })
);

export type PassportBrands = { [brandSlug: string]: PassportBrandsSelection };
export async function getPassportBrands(brandSlugs: string[]) {
  return runQuery(
    q(`*[_type=="brand"][slug.current in $brandSlugs]`)
      .filter(`_type == "brand"`)
      .grab(passportBrandsSelection),
    { brandSlugs }
  ).then((brands) => {
    return brands.reduce((acc, cur) => {
      acc[cur.slug] = cur;
      return acc;
    }, {} as PassportBrands);
  });
}
