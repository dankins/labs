import { makeSafeQueryRunner, q, sanityImage, TypeFromSelection } from "groqd";

import { sanityClient } from "@danklabs/integrations/sanitycms";

export const brandListSelection = {
  name: q.string(),
  slug: q.slug("slug"),
  logoSquare: sanityImage("logo_square").nullable(),
};

export type BrandListSelection = TypeFromSelection<typeof brandListSelection>;

const runQuery = makeSafeQueryRunner(
  (q: string, params: Record<string, number | string> = {}) =>
    sanityClient.fetch(q, {
      ...params,
      // @ts-ignore
      next: {
        revalidate: 1, // look for updates to revalidate cache every 60 seconds
      },
    })
);

export type GetBrandsFilter = {
  status?: string;
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
