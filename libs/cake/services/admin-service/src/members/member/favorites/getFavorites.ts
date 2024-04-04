import {
  Favorite,
  db,
  favorites as favoritesModel,
  members,
  brands as brandsModel,
} from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { brands } from "../../../brands";

export async function getFavorites(userId: string) {
  const faves = await db
    .select()
    .from(members)
    .innerJoin(favoritesModel, eq(members.id, favoritesModel.memberId))
    .innerJoin(brandsModel, eq(favoritesModel.brandId, brandsModel.id));

  if (faves.length === 0) {
    return [];
  }

  const brandSlugs = faves.map((fave) => fave.brands.slug);
  const brandMap = await brands.cachedGetBrandsBySlug(brandSlugs);

  return faves.map((fave) => ({
    name: brandMap[fave.brands.slug].cms?.name,
    memberId: fave.members.id,
    brandId: brandMap[fave.brands.slug].db?.id!,
    passLogo: brandMap[fave.brands.slug].cms?.passLogo,
  }));
}
