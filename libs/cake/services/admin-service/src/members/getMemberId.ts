import { clerkClient } from "@clerk/nextjs";
import { unstable_cache } from "next/cache";
import { superadmin } from "../super-admin";
import { db, members } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";

export type getMemberReturnType = {
  firstName: string | null;
  isSuperAdmin: boolean;
  isBrandManager: boolean;
  isMember: boolean;
  passes: { [key: string]: any };
};

async function getMemberById(memberId: string): Promise<getMemberReturnType> {
  const dbMember = await db.query.members.findFirst({
    where: eq(members.id, memberId),
  });
  if (!dbMember) {
    throw new Error(`Member not found`);
  }

  const iamUser = await clerkClient.users.getUser(dbMember.iam);

  const admins = await superadmin.cachedGetSuperAdmins();

  return {
    firstName: iamUser.firstName,
    isSuperAdmin: admins.map((a) => a.iam).includes(dbMember.iam),
    isBrandManager: false,
    isMember: false,
    passes: [],
  };
}

export async function cachedGetMemberById(memberId: string) {
  const fn = unstable_cache(getMemberById, [`get-member-by-id-${memberId}`], {
    tags: [`get-member-by-id-${memberId}`],
  });

  return fn(memberId);
}
