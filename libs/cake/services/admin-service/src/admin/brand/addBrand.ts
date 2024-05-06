import { makeSafeQueryRunner, q, sanityImage, Selection } from "groqd";
import { sanityClient } from "@danklabs/integrations/sanitycms";
import { revalidateTag } from "next/cache";

import { brands, db, profiles } from "@danklabs/cake/db";
import { sanityWriteClient } from "@danklabs/integrations/sanitycms";

export async function addBrand(slug: string) {
  console.log("add brand", slug);

  let cmsId = await brandExists(slug);

  if (cmsId) {
    console.log("Brand already exists in Sanity, so not creating");
  } else {
    const result = await sanityWriteClient.create({
      _type: "brand",
      slug: { current: slug },
    });
    cmsId = result._id;
    console.log("created brand in CMS", result);
  }

  const insertedBrand = await db
    .insert(brands)
    .values({
      slug,
      cmsId,
      settings: {},
      admins: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();
  const brandRecord = insertedBrand[0];

  await db.insert(profiles).values({
    parentType: "brand",
    parentId: brandRecord.id,
    username: slug,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  revalidateTag("get-brands-admin");

  return slug;
}

const brandSelection = {
  _id: q.string(),
} satisfies Selection;

const runQuery = makeSafeQueryRunner(
  (q: string, params: Record<string, number | string> = {}) =>
    sanityClient.fetch(q, {
      ...params,
    })
);

async function brandExists(slug: string): Promise<string | undefined> {
  return runQuery(
    q(`*[_type=="brand"][slug.current==$slug]`)
      .filter(`_type == "brand"`)
      .grab(brandSelection)
      .slice(0, 1),
    { slug }
  ).then((x) => {
    if (x.length === 0) {
      return undefined;
    }
    return x[0]._id;
  });
}
