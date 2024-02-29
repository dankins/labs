"use server";

import { revalidatePath } from "next/cache";

export async function addFavorite(slug: string) {
  console.log("addFavorite", slug);
  revalidatePath("/brands/" + slug);
  return new Promise((resolve) => {
    setTimeout(() => resolve("ok"), 1400);
  });
}

export async function removeFavorite(slug: string) {
  console.log("addFavorite", slug);
  revalidatePath("/brands/" + slug);
  return new Promise((resolve) => {
    setTimeout(() => resolve("ok"), 1400);
  });
}
