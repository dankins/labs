import { clerkClient } from "@clerk/nextjs";
import { unstable_cache } from "next/cache";
import { superadmin } from "../super-admin";

export type getMemberReturnType = {
  firstName: string | null;
  isSuperAdmin: boolean;
  isBrandManager: boolean;
  isMember: boolean;
  passes: { [key: string]: any };
};

async function getMember(iam: string): Promise<getMemberReturnType> {
  const member = await clerkClient.users.getUser(iam);

  const admins = await superadmin.cachedGetSuperAdmins();

  console.log("get member", {
    isSuperAdmin: admins.map((a) => a.iam).includes(iam),
  });

  return {
    firstName: member.firstName,
    isSuperAdmin: admins.map((a) => a.iam).includes(iam),
    isBrandManager: false,
    isMember: false,
    passes: [],
  };
}

export async function cachedGetMember(iam: string) {
  const fn = unstable_cache(getMember, [`get-member-${iam}`], {
    tags: [`get-member-${iam}`],
  });

  return fn(iam);
}
