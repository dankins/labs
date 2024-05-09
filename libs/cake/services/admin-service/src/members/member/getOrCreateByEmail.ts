import { clerkClient } from "@clerk/nextjs/server";
import { getByEmail } from "./getByEmail";
import { Member } from "./types";
import { create } from "./create";

export async function getOrCreateByEmail(
  email: string,
  data: Parameters<typeof create>[1],
  firstName?: string,
  lastName?: string
): Promise<Member> {
  try {
    const member = await getByEmail(email);
    return member;
  } catch (err: any) {
    if (err.message === "member not found") {
      const newUser = await clerkClient.users.createUser({
        emailAddress: [email],
        firstName,
        lastName,
      });
      await create(newUser.id, data);
      return getByEmail(email);
    }
    throw err;
  }
}
