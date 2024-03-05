"use server";
import { auth } from "@clerk/nextjs";
import {
  addFavorite,
  removeFavorite,
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

async function claimPassAction(slug: string) {
  console.log("claimPassAction", slug);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("ok");
    }, 4000);
  });
  // if (!passportId) {
  //   throw new Error("unknown passport id");
  // }
  // await db.transaction(async (tx) => {
  //   await createBrandPass(tx, passportId, slug);
  // });

  // revalidatePath("/passport");
  // revalidatePath("/brands");
  // revalidatePath(`/brands/${slug}`);
}
