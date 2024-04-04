import { db, favorites as favoritesModel } from "@danklabs/cake/db";
import { and, eq, inArray } from "drizzle-orm";

import { getFavorites } from "./getFavorites";

type InsertFavorite = typeof favoritesModel.$inferInsert;

export async function addFavorite(
  memberId: string,
  brandId: string
): Promise<void> {
  console.log("addFavorite", brandId, memberId);
  const record: InsertFavorite = {
    memberId,
    brandId,
  };
  await db.insert(favoritesModel).values(record);
}

export async function removeFavorite(
  memberId: string,
  brandId: string
): Promise<void> {
  return removeFavorites(memberId, [brandId]);
}

export async function removeFavorites(
  memberId: string,
  brandIds: string[]
): Promise<void> {
  console.log("removeFavorites", memberId, brandIds);
  const result = await db
    .delete(favoritesModel)
    .where(
      and(
        eq(favoritesModel.memberId, memberId),
        inArray(favoritesModel.brandId, brandIds)
      )
    )
    .returning();
}

export const favorites = {
  getFavorites,
  addFavorite,
  removeFavorite,
  removeFavorites,
};
