import { makeSafeQueryRunner, q, sanityImage, TypeFromSelection } from "groqd";

import { sanityClient } from "@danklabs/integrations/sanitycms";

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

export type GetBrandsFilter = {
  status?: string;
  slugs?: string[];
};
export async function getBrands(filter?: GetBrandsFilter) {
  const query = q("*", { isArray: false }).filterByType("brand");
  return runQuery(
    q("").grab({
      brands: query.order("name").grab$(brandListSelection),
      brandCount: q(`count(*[_type == "brand"])`),
    }),
    { status: "any" }
  );
}

export async function getBrandsNoCount(filter?: GetBrandsFilter) {
  let query = q(`*[_type=="brand"]`, { isArray: true });
  if (filter?.slugs) {
    // @ts-ignore
    query = query.filter("slug.current in $slugs");
  }

  return runQuery(query.grab(brandListSelection), filter);
}
