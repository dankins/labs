import { makeSafeQueryRunner, q } from "groqd";

import { sanityClient } from "@danklabs/integrations/sanitycms";

const runQuery = makeSafeQueryRunner((q) =>
  sanityClient.fetch(q, {
    next: {
      revalidate: 5, // look for updates to revalidate cache every 60 seconds
    },
  })
);

export async function getSite() {
  return (
    runQuery(
      q("*", { isArray: false })
        .filterByType("site")
        .grab({
          name: q.string(),
          slug: q.slug("slug"),
        })
        .slice(0, 0)
    )
      // return the first result
      .then((d) => d[0])
  );
}
