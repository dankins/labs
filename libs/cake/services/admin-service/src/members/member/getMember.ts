import { clerkClient } from "@clerk/nextjs/server";
import { unstable_cache } from "next/cache";
import { superadmin } from "../../super-admin";
import { db, members } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { Member, MemberCollection } from "./types";
import { DEFAULT_MAX_COLLECTION_ITEMS, create } from "./create";

async function fn(iam: string): Promise<Member> {
  const iamMember = await clerkClient.users.getUser(iam);
  if (!iamMember) {
    throw new Error("user not found");
  }
  let dbMember = await getDbUser(iam);
  if (!dbMember) {
    throw new Error("member not found");
  }
  if (!dbMember) {
    throw new Error("invalid state");
  }

  const collection: MemberCollection = {
    brandSlugs: [],
    value: 0,
    count: 0,
    remaining: 0,
    maxCollectionItems: dbMember.maxCollectionItems,
    itemMap: {},
  };

  dbMember.passport.passes.forEach((collectionItem) => {
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
      offers: collectionItem.offers.map((offer) => {
        return {
          name: offer.template.name || undefined,
          offerType: offer.template.offerType,
          offerValue: parseFloat(offer.template.offerValue),
          status: offer.status,
          code: offer.code?.code || undefined,
        };
      }),
    };
  });

  const favorites: string[] = [];
  dbMember.favorites.forEach((favorite) => {
    favorites.push(favorite.brand.slug);
  });

  collection.remaining = collection.maxCollectionItems - collection.count;

  let id = dbMember?.id;

  if (!id) {
    throw new Error("invalid state");
  }

  const admins = await superadmin.cachedGetSuperAdmins();

  return {
    id,
    iam: iamMember.id,
    profile: dbMember.profile || undefined,
    username: dbMember.profile?.username || undefined,
    firstName: iamMember.firstName,
    lastName: iamMember.lastName,
    stripeCustomerId: dbMember.stripeCustomerId || undefined,
    stripeSubscriptionId: dbMember.stripeSubscriptionId || undefined,
    invitationId: dbMember.invitationId || undefined,
    email: iamMember.emailAddresses.filter(
      (e) => e.id === iamMember.primaryEmailAddressId
    )[0].emailAddress!,
    isSuperAdmin: admins.map((a) => a.iam).includes(iam),
    isBrandManager: false,
    membershipStatus: dbMember?.membershipStatus || undefined,
    collection,
    favorites,
  };
}

export async function getMember(iam: string) {
  return unstable_cache(fn, [`get-member-${iam}`], {
    tags: [`get-member-${iam}`],
  })(iam);
}

function getDbUser(iam: string) {
  return db.query.members.findFirst({
    where: eq(members.iam, iam),
    with: {
      favorites: {
        with: {
          brand: true,
        },
      },
      profile: true,
      passport: {
        with: {
          passes: {
            with: {
              brand: true,
              offers: {
                with: {
                  template: true,
                  code: true,
                },
              },
            },
          },
        },
      },
    },
  });
}
