"use server";

import { members } from "@danklabs/cake/services/admin-service";
import { revalidatePath } from "next/cache";

export async function removeMultipleFavorites(
  memberId: string,
  brandIds: string[]
) {
  console.log("remove multiple", memberId, brandIds);
  await members.member.favorites.removeFavorites(memberId, brandIds);
  revalidatePath("/account/favorites");
}
