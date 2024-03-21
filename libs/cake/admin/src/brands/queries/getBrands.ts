import { makeSafeQueryRunner, q, sanityImage } from "groqd";

import { sanityClient } from "@danklabs/integrations/sanitycms";

export const brandListSelection = {
  slug: q.slug("slug"),
  name: q.string().optional(),
  logoSquare: sanityImage("logo_square").nullable(),
};

const runQuery = makeSafeQueryRunner(
  (q: string, params: Record<string, number | string> = {}) =>
    sanityClient.fetch(q, {
      ...params,
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
