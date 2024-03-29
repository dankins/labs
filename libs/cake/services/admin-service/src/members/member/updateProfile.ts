import { clerkClient } from "@clerk/nextjs/server";
import { trackProfileUpdated } from "@danklabs/cake/events";
import { clearCache } from "./clearCache";

export type Profile = {
  firstName?: string;
  lastName?: string;
  email: string;
};

export async function updateProfile(iam: string, data: Partial<Profile>) {
  const result = await clerkClient.users.updateUser(iam, data);
  console.log("update successful", result);
  clearCache(iam);

  trackProfileUpdated(iam, data);
}
