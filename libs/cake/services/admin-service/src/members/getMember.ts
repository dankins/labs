import { clerkClient } from "@clerk/nextjs";
import { unstable_cache } from "next/cache";
import { superadmin } from "../super-admin";

export type getMemberReturnType = {
  firstName: string | null;
  iam: string;
  email: string;
  isSuperAdmin: boolean;
  isBrandManager: boolean;
  isMember: boolean;
  passes: { [key: string]: any };
};

async function getMember(iam: string): Promise<getMemberReturnType> {
  const member = await clerkClient.users.getUser(iam);

  const admins = await superadmin.cachedGetSuperAdmins();

  return {
    iam: member.id,
    firstName: member.firstName,
    email: member.emailAddresses.filter(
      (e) => e.id === member.primaryEmailAddressId
    )[0].emailAddress!,
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
