import {
  makeSafeQueryRunner,
  nullToUndefined,
  q,
  sanityImage,
  Selection,
} from "groqd";

import { sanityClient } from "@danklabs/integrations/sanitycms";

export const contentSelection = {
  title: q.string(),
  slug: q.slug("slug"),
  image: sanityImage("image", {
    withAsset: ["base", "dimensions", "lqip"],
    withHotspot: true,
    withCrop: true,
  }),
  brand: q("brand").deref().grab({
    name: q.string(),
  }),
  excerpt: q.string(),
  content: q("content")
    .filter()
    .select({
      '_type == "block"': ["{...}", q.contentBlock()],
      '_type == "image"': {
        _type: q.literal("image"),
        _key: q.string(),
        // assetId: q.string(),
        asset: q("asset").grab({ _type: q.string(), _ref: q.string() }),
      },
      default: {
        _key: q.string(),
        _type: ['"unsupported"', q.literal("unsupported")],
        unsupportedType: ["_type", q.string()],
      },
    }),
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

export async function getContent(slug: string) {
  return runQuery(
    q(`*[_type=="content"][slug.current==$slug]`)
      .filter(`_type == "content"`)
      .grab(contentSelection)
      .slice(0, 0),
    { slug }
  ).then((x) => {
    return x[0];
  });
}
