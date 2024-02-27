"use server";
import { auth, clerkClient, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { validateFormData } from "@danklabs/utils";
import { identify } from "@danklabs/cake/events";

export async function updateProfile(formData: FormData) {
  const { userId } = auth();
  const user = await currentUser();
  if (!userId) {
    throw new Error("userId unavailable");
  }
  const data = validateFormData(
    formData,
    z.object({
      firstName: z.string(),
      lastName: z.string(),
      phone: z.string().optional(),
    })
  );

  const result = await clerkClient.users.updateUser(userId, data);
  console.log("update successful", result);
  revalidatePath("/account/profile");

  identify(userId, { ...data, email: user?.emailAddresses[0].emailAddress });
}
