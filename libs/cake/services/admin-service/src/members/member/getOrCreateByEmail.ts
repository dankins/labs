import { clerkClient } from "@clerk/nextjs/server";
import { getByEmail } from "./getByEmail";
import { Member } from "./types";
import { DEFAULT_MAX_COLLECTION_ITEMS, create } from "./create";

export async function getOrCreateByEmail(email: string): Promise<Member> {
  try {
    const member = await getByEmail(email);
    return member;
  } catch (err: any) {
    if (err.message === "member not found") {
      const newUser = await clerkClient.users.createUser({
        emailAddress: [email],
      });
      await create(newUser.id, {
        maxCollectionItems: DEFAULT_MAX_COLLECTION_ITEMS,
      });
      return getByEmail(email);
    }
    throw err;
  }
}
