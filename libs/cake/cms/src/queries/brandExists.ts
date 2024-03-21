import { makeSafeQueryRunner, q, sanityImage, Selection } from "groqd";

import { sanityClient } from "@danklabs/integrations/sanitycms";

const brandSelection = {
  slug: q.slug("slug"),
} satisfies Selection;

const runQuery = makeSafeQueryRunner(
  (q: string, params: Record<string, number | string> = {}) =>
    sanityClient.fetch(q, {
      ...params,
    })
);

export async function brandExists(slug: string) {
  return runQuery(
    q(`*[_type=="brand"][slug.current==$slug]`)
      .filter(`_type == "brand"`)
      .grab(brandSelection)
      .slice(0, 1),
    { slug }
  ).then((x) => {
    if (x.length === 0) {
      return false;
    }
    return true;
  });
}
