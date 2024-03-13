"use server";
import { auth } from "@clerk/nextjs";
import {
  addFavorite,
  removeFavorite,
  claimPass,
} from "@danklabs/cake/services/admin-service";
import { revalidatePath } from "next/cache";

export async function addFavoriteAction(
  memberId: string,
  brandId: string,
  brandSlug: string
) {
  console.log("addFavoriteAction", memberId, brandId);
  await addFavorite(memberId, brandId);
  revalidatePath("/brands/" + brandSlug);
}

export async function removeFavoriteAction(
  memberId: string,
  brandId: string,
  brandSlug: string
) {
  await removeFavorite(memberId, brandId);
  revalidatePath("/brands/" + brandSlug);
}

export async function claimPassAction(iam: string, slug: string) {
  return claimPass(iam, slug);
}
