import { makeSafeQueryRunner, q, sanityImage } from "groqd";

import { sanityClient } from "@danklabs/integrations/sanitycms";

const runQuery = makeSafeQueryRunner(
  (q: string, params: Record<string, number | string> = {}) =>
    sanityClient.fetch(q, {
      ...params,
    })
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
      { slug }
    )
      // return the first result
      .then((d) => d[0])
  );
}
