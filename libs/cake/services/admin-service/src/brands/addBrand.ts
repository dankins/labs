import { brandExists, getBrandAdmin } from "@danklabs/cake/cms";
import { brands, db } from "@danklabs/cake/db";
import { sanityWriteClient } from "@danklabs/integrations/sanitycms";
import { revalidateTag } from "next/cache";

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

  await db.insert(brands).values({
    slug,
    cmsId,
    settings: {},
    admins: [],
  });

  revalidateTag("get-brands-admin");

  return slug;
}
