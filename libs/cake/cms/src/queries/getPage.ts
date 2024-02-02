import { makeSafeQueryRunner, q, sanityImage } from "groqd";

import { sanityClient } from "@danklabs/integrations/sanitycms";

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

export async function getPage(slug: string) {
  return (
    runQuery(
      q("*", { isArray: false })
        .filterByType("page")
        .grab({
          heroImage: sanityImage("hero_image", {
            withAsset: ["base", "dimensions", "lqip"],
            withHotspot: true,
            withCrop: true,
          }),
        })
        .slice(0, 0)
    )
      // return the first result
      .then((d) => d[0])
  );
}
