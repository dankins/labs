import { makeSafeQueryRunner, q, Selection } from "groqd";

import { sanityClient } from "@danklabs/integrations/sanitycms";

export const brandSelection = {
  name: q.string(),
  slug: q.slug("slug"),
} satisfies Selection;

const runQuery = makeSafeQueryRunner(
  (q: string, params: Record<string, number | string> = {}) =>
    sanityClient.fetch(q, {
      ...params,
      next: {
        revalidate: 1, // look for updates to revalidate cache every 60 seconds
      },
    })
);

export async function getBrandAdmin(slug: string) {
  return runQuery(
    q(`*[_type=="brand"][slug.current==$slug]`)
      .filter(`_type == "brand"`)
      .grab(brandSelection)
      .slice(0, 1),
    { slug }
  ).then((x) => {
    return x[0];
  });
}
