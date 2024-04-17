import { getMember } from "./getMember";
import { Member } from "./types";
import { clerkClient } from "@clerk/nextjs/server";

export async function getByEmail(email: string): Promise<Member> {
  const clerkUserByEmail = await clerkClient.users.getUserList({
    emailAddress: [email],
  });

  if (clerkUserByEmail.totalCount === 0) {
    throw new Error("member not found");
  }

  return getMember(clerkUserByEmail.data[0].id);
}
