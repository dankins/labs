import { makeSafeQueryRunner, q, sanityImage, TypeFromSelection } from "groqd";

import { sanityClient } from "@danklabs/integrations/sanitycms";

export const contentListSelection = {
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
  featured: q.boolean().optional(),
};

export type ContentListSelection = TypeFromSelection<
  typeof contentListSelection
>;

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

export type GetContentListFilter = {
  status?: string;
};
export async function getContentList(filter?: GetContentListFilter) {
  const query = q("*", { isArray: false }).filterByType("content");
  return runQuery(
    q("").grab({
      content: query.order("name").grab$(contentListSelection),
      contentCount: q(`count(*[_type == "content"])`),
    }),
    { status: "any" }
  );
}
