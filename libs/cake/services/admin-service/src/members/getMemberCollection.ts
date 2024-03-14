import { db, members } from "@danklabs/cake/db";
import { unstable_cache } from "next/cache";
import { createMemberPassport } from "../createMemberPassport";
import { eq } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs";

export type getMemberCollectionItemType = {
  slug: string;
  value: number;
};

export type getMemberCollectionReturnType = {
  value: number;
  count: number;
  brandSlugs: string[];
  itemMap: {
    [slug: string]: getMemberCollectionItemType;
  };
};

async function getMemberCollection(
  iam: string
): Promise<getMemberCollectionReturnType> {
  console.log("loading getMemberCollection", iam);
  const result = await db.query.members.findFirst({
    where: eq(members.iam, iam),
    with: {
      passport: {
        with: {
          passes: {
            with: {
              brand: true,
              offers: {
                with: {
                  template: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (result && !result.passport) {
    console.log("found member IAM but there is no passport");
    await createMemberPassport(result.id);
    return getMemberCollection(iam);
  }

  let itemMap: getMemberCollectionReturnType["itemMap"] = {};
  let brandSlugs: string[] = [];
  let value = 0;
  let count = 0;
  result?.passport.passes.forEach((collectionItem) => {
    const itemValue = collectionItem.offers.reduce((totalValue, offer) => {
      return totalValue + parseFloat(offer.template.offerValue);
    }, 0);
    count = count + 1;
    value = value + itemValue;
    brandSlugs = brandSlugs.concat(collectionItem.brand.slug);
    itemMap[collectionItem.brand.slug] = {
      slug: collectionItem.brand.slug,
      value: itemValue,
    };
  });

  return {
    value,
    count,
    brandSlugs,
    itemMap,
  };
}

export async function cachedGetMemberCollection(iam: string) {
  const fn = unstable_cache(
    getMemberCollection,
    [`get-member-collection-${iam}`],
    {
      tags: [`get-member-collection-${iam}`],
    }
  );

  return fn(iam);
}
