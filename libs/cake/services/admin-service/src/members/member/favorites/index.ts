import { db, favorites as favoritesModel } from "@danklabs/cake/db";
import { and, eq, inArray } from "drizzle-orm";

import { getFavorites } from "./getFavorites";
import { members } from "../..";
import { brands } from "../../../brands";
import { clearCache } from "../clearCache";

type InsertFavorite = typeof favoritesModel.$inferInsert;

export async function addFavorite(
  iam: string,
  brandSlug: string
): Promise<void> {
  const [member, brand] = await Promise.all([
    members.member.get(iam),
    brands.getBrand(brandSlug),
  ]);
  const record: InsertFavorite = {
    memberId: member.id,
    brandId: brand.db.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await db.insert(favoritesModel).values(record);
  clearCache(member.iam);
}

export async function removeFavorite(
  iam: string,
  brandSlug: string
): Promise<void> {
  const brand = await brands.getBrand(brandSlug);

  return removeFavorites(iam, [brand.db.id]);
}

export async function removeFavorites(
  iam: string,
  brandIds: string[]
): Promise<void> {
  const member = await members.member.get(iam);
  const memberId = member.id;
  await db
    .delete(favoritesModel)
    .where(
      and(
        eq(favoritesModel.memberId, memberId),
        inArray(favoritesModel.brandId, brandIds)
      )
    )
    .returning();
  clearCache(member.iam);
}

export const favorites = {
  getFavorites,
  addFavorite,
  removeFavorite,
  removeFavorites,
};
