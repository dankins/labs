import { eq } from "drizzle-orm";
import { getMember } from "./getMember";
import { db, members } from "@danklabs/cake/db";
import { Member } from "./types";

export async function getBySubscriptionId(
  subscriptionId: string
): Promise<Member> {
  const dbMember = await db.query.members.findFirst({
    where: eq(members.stripeSubscriptionId, subscriptionId),
  });
  if (!dbMember) {
    throw new Error(`Member not found`);
  }
  return getMember(dbMember.iam);
}
