import { makeSafeQueryRunner, q, sanityImage, Selection } from "groqd";

import { sanityClient } from "@danklabs/integrations/sanitycms";

export const brandSelection = {
  slug: q.slug("slug"),
  name: q.string().optional().nullable(),
  website: q.string().optional().nullable(),
  summary: q.string().optional().nullable(),
  passLogo: sanityImage("pass_logo").nullable(),
  passBackground: sanityImage("pass_background", {
    withAsset: ["base", "dimensions", "lqip"],
    withHotspot: true,
    withCrop: true,
  }).nullable(),
  passBackgroundDesktop: sanityImage("pass_background_desktop", {
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
    if (x.length === 0) {
      throw new Error(`Brand not found`);
    }
    return x[0];
  });
}
