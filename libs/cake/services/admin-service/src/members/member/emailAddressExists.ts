import { clerkClient } from "@clerk/nextjs/server";

export async function emailAddressExists(email: string) {
  const clerkUserByEmail = await clerkClient.users.getUserList({
    emailAddress: [email],
  });

  return clerkUserByEmail.totalCount > 0;
}
