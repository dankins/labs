import { clerkClient } from "@clerk/nextjs";
import { db } from "@danklabs/cake/db";
import { unstable_cache } from "next/cache";

async function getSuperAdmins() {
  const superAdmins = await db.query.superAdmins.findMany();
  const iamUsers = await clerkClient.users.getUserList({
    userId: superAdmins.map((admin) => admin.iam),
  });

  const mergedData = superAdmins.map((admin) => {
    const user = iamUsers.find((user) => user.id === admin.iam);
    return { ...admin, user: user! };
  });

  return mergedData;
}

export async function cachedGetSuperAdmins() {
  const fn = unstable_cache(getSuperAdmins, [`get-super-admins`], {
    tags: [`get-super-admins`],
  });

  return fn();
}
