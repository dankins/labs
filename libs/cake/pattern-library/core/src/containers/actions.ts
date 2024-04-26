"use server";

import { revalidatePath } from "next/cache";

export async function signOutAction(): Promise<void> {
  revalidatePath("/");
}
