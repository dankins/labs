import { clerkClient } from "@clerk/nextjs";
import { unstable_cache } from "next/cache";

export type getMemberReturnType = {
  firstName: string;
};
async function getMember(iam: string) {
  const member = await clerkClient.users.getUser(iam);

  return {
    firstName: member.firstName,
  };
}

export async function cachedGetMember(iam: string) {
  const fn = unstable_cache(getMember, [`get-member-${iam}`], {
    tags: [`get-member-${iam}`],
  });

  return fn(iam);
}
