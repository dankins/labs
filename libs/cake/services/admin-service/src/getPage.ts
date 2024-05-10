import { makeSafeQueryRunner, q, sanityImage } from "groqd";

import { sanityClient } from "@danklabs/integrations/sanitycms";

const runQuery = makeSafeQueryRunner(
  (q: string, params: Record<string, number | string> = {}, tags) =>
    sanityClient.fetch(
      q,
      {
        ...params,
      },
      {
        next: {
          tags,
        },
      }
    )
);

export async function getPage(slug: string) {
  return (
    runQuery(
      q(`*[_type=="page"][slug.current==$slug]`)
        .filterByType("page")
        .grab({
          heroImage: sanityImage("hero_image", {
            withAsset: ["base", "dimensions", "lqip"],
            withHotspot: true,
            withCrop: true,
          }).nullable(),
          video: q("video")
            .grab$({
              asset: q("asset").deref().grab$({
                playbackId: q.string(),
                assetId: q.string(),
              }),
            })
            .nullable(),
          content: q("content")
            .filter()
            .select({
              '_type == "block"': ["{...}", q.contentBlock()],
              '_type == "faq"': {
                _type: q.literal("faq"),
                _key: q.string(),
                questions: q.array(
                  q.object({
                    question: q.string(),
                    answer: q.contentBlocks(),
                  })
                ),
              },
              default: {
                _key: q.string(),
                _type: ['"unsupported"', q.literal("unsupported")],
                unsupportedType: ["_type", q.string()],
              },
            }),
        })
        .slice(0, 0),
      { slug },
      [`sanity-page-${slug}`]
    )
      // return the first result
      .then((d) => d[0])
  );
}
