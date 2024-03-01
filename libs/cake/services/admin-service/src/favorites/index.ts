import { Favorite, db, favorites, members, brands } from "@danklabs/cake/db";
import { and, eq, inArray } from "drizzle-orm";

type InsertFavorite = typeof favorites.$inferInsert;

export async function getFavorites(userId: string) {
  return db
    .select()
    .from(members)
    .innerJoin(favorites, eq(members.id, favorites.memberId))
    .innerJoin(brands, eq(favorites.brandId, brands.id));
}

export async function addFavorite(
  memberId: string,
  brandId: string
): Promise<void> {
  console.log("addFavorite", brandId, memberId);
  const record: InsertFavorite = {
    memberId,
    brandId,
  };
  await db.insert(favorites).values(record);
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
    .delete(favorites)
    .where(
      and(
        eq(favorites.memberId, memberId),
        inArray(favorites.brandId, brandIds)
      )
    )
    .returning();
  console.log("result", result);
}
