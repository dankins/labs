"use server";

import { auth } from "@clerk/nextjs/server";
import { members } from "@danklabs/cake/services/admin-service";

export async function addFavoriteAction(brandSlug: string) {
  const { userId: iam } = auth().protect();
  await members.member.favorites.addFavorite(iam, brandSlug);
}

export async function removeFavoriteAction(brandSlug: string) {
  const { userId: iam } = auth().protect();
  await members.member.favorites.removeFavorite(iam, brandSlug);
}

export async function claimPassAction(iam: string, slug: string) {
  return members.member.claimPass(iam, slug);
}
