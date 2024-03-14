import { clerkClient } from "@clerk/nextjs";
import { identify, trackProfileUpdated } from "@danklabs/cake/events";
import { revalidatePath } from "next/cache";

export type Profile = {
  firstName?: string;
  lastName?: string;
  email: string;
};

export async function updateProfile(userId: string, data: Partial<Profile>) {
  const result = await clerkClient.users.updateUser(userId, data);
  console.log("update successful", result);
  revalidatePath("/account/profile");

  trackProfileUpdated(userId, data);
}
