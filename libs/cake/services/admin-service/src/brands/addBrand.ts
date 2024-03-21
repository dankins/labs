import { brandExists, getBrandAdmin } from "@danklabs/cake/cms";
import { brands, db } from "@danklabs/cake/db";
import { sanityWriteClient } from "@danklabs/integrations/sanitycms";

export async function addBrand(slug: string) {
  console.log("add brand", slug);
  await db.insert(brands).values({
    slug,
    settings: {},
    admins: [],
  });

  if (await brandExists(slug)) {
    console.log("Brand already exists in Sanity, so not creating");
  } else {
    const result = await sanityWriteClient.create({
      _type: "brand",
      slug: { current: slug },
    });
    console.log("created brand in CMS", result);
  }

  return slug;
}
