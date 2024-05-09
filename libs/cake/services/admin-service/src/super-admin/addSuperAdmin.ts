import { clerkClient } from "@clerk/nextjs/server";
import { db, superAdmins } from "@danklabs/cake/db";
import { revalidateTag } from "next/cache";
import { members } from "../members";
import { DEFAULT_MAX_COLLECTION_ITEMS } from "../members/member/create";

export async function addSuperAdmin(email: string) {
  console.log("addSuperAdmin", email);

  const member = await members.member.getOrCreateByEmail(email, {
    maxCollectionItems: DEFAULT_MAX_COLLECTION_ITEMS,
  });

  await db.insert(superAdmins).values([
    {
      iam: member.iam,
      role: "super_admin",
    },
  ]);

  members.member.clearCache(member.iam);
  revalidateTag("get-super-admins");
}
