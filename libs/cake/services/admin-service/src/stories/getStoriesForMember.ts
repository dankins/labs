import { makeSafeQueryRunner, q, sanityImage, TypeFromSelection } from "groqd";
import { sanityClient } from "@danklabs/integrations/sanitycms";

import { unstable_cache } from "next/cache";

const contentListSelection = {
  title: q.string(),
  slug: q.slug("slug"),
  image: sanityImage("image", {
    withAsset: ["base", "dimensions", "lqip"],
    withHotspot: true,
    withCrop: true,
  }),
  brand: q("brand")
    .deref()
    .grab({
      name: q.string(),
    })
    .nullable(),
  excerpt: q.string().optional(),
  featured: q.boolean().optional(),
};

export type ContentListSelection = TypeFromSelection<
  typeof contentListSelection
>;

const runQuery = makeSafeQueryRunner(
  (q: string, params: Record<string, number | string> = {}) =>
    sanityClient.fetch(q, {
      ...params,
    })
);

export type GetContentListFilter = {
  status?: string;
};

export async function getStoriesForMember(iam: string) {
  const query = q("*", { isArray: false }).filterByType("content");
  const stories = await runQuery(
    q("").grab({
      content: query.order("name").grab$(contentListSelection),
      contentCount: q(`count(*[_type == "content"])`),
    }),
    { status: "any" }
  );

  return stories.content;
}

export async function cachedGetStoriesForMember(iam: string) {
  const fn = unstable_cache(
    getStoriesForMember,
    [`get-stories-for-member-${iam}`],
    {
      revalidate: 360,
    }
  );

  return fn(iam);
}
