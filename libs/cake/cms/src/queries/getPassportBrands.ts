import { makeSafeQueryRunner, q, sanityImage, TypeFromSelection } from "groqd";

import { sanityClient } from "@danklabs/integrations/sanitycms";

export const passportBrandsSelection = {
  name: q.string(),
  slug: q.slug("slug"),
  logoSquare: sanityImage("logo_square").nullable(),
  passBackground: sanityImage("pass_background", {
    withAsset: ["base", "dimensions", "lqip"],
  }).nullable(),
};

export type PassportBrandsSelection = TypeFromSelection<
  typeof passportBrandsSelection
>;

const runQuery = makeSafeQueryRunner(
  (q: string, params: Record<string, number | string | string[]> = {}) =>
    sanityClient.fetch(q, {
      ...params,
      next: {
        revalidate: 1, // look for updates to revalidate cache every 60 seconds
      },
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
