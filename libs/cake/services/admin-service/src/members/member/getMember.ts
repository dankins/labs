import { clerkClient } from "@clerk/nextjs/server";
import { unstable_cache } from "next/cache";
import { superadmin } from "../../super-admin";
import { db, members } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { create } from "./create";
import { Member, MemberCollection } from "./types";

async function getMember(iam: string): Promise<Member> {
  const iamMember = await clerkClient.users.getUser(iam);
  if (!iamMember) {
    throw new Error("user not found");
  }
  let dbMember = await getDbUser(iam);
  if (!dbMember) {
    await create(iam, {});
    dbMember = await getDbUser(iam);
  }
  if (!dbMember) {
    throw new Error("invalid state");
  }

  const collection: MemberCollection = {
    brandSlugs: [],
    value: 0,
    count: 0,
    remaining: 0,
    itemMap: {},
  };

  dbMember?.passport.passes.forEach((collectionItem) => {
    const itemValue = collectionItem.offers.reduce((totalValue, offer) => {
      return totalValue + parseFloat(offer.template.offerValue);
    }, 0);
    collection.count = collection.count + 1;
    collection.value = collection.value + itemValue;
    collection.brandSlugs = collection.brandSlugs.concat(
      collectionItem.brand.slug
    );
    collection.itemMap[collectionItem.brand.slug] = {
      slug: collectionItem.brand.slug,
      value: itemValue,
    };
  });

  let id = dbMember?.id;

  if (!id) {
    throw new Error("invalid state");
  }

  const admins = await superadmin.cachedGetSuperAdmins();

  return {
    id,
    iam: iamMember.id,
    firstName: iamMember.firstName,
    lastName: iamMember.lastName,
    stripeCustomerId: dbMember.stripeCustomerId || undefined,
    stripeSubscriptionId: dbMember.stripeSubscriptionId || undefined,
    email: iamMember.emailAddresses.filter(
      (e) => e.id === iamMember.primaryEmailAddressId
    )[0].emailAddress!,
    isSuperAdmin: admins.map((a) => a.iam).includes(iam),
    isBrandManager: false,
    membershipStatus: dbMember?.membershipStatus || undefined,
    collection,
  };
}

export async function cachedGetMember(iam: string) {
  const fn = unstable_cache(getMember, [`get-member-${iam}`], {
    tags: [`get-member-${iam}`],
  });

  return fn(iam);
}

function getDbUser(iam: string) {
  return db.query.members.findFirst({
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
}
