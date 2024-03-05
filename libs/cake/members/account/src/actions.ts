"use server";

import { removeFavorites } from "@danklabs/cake/services/admin-service";
import { revalidatePath } from "next/cache";

export async function removeMultipleFavorites(
  memberId: string,
  brandIds: string[]
) {
  console.log("remove multiple", memberId, brandIds);
  await removeFavorites(memberId, brandIds);
  revalidatePath("/account/favorites");
}
