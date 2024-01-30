import { makeSafeQueryRunner, q, sanityImage, Selection } from "groqd";

import { sanityClient } from "@danklabs/integrations/sanitycms";

export const brandSelection = {
  name: q.string(),
  slug: q.slug("slug"),
  website: q.string(),
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
} satisfies Selection;

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
