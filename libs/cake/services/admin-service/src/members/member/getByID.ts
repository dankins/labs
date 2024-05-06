import { unstable_cache } from "next/cache";
import { db, members } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { getMember } from "./getMember";
import { Member } from "./types";

export async function getById(memberId: string): Promise<Member> {
  const dbMember = await db.query.members.findFirst({
    where: eq(members.id, memberId),
  });
  if (!dbMember) {
    throw new Error(`Member not found`);
  }
  return getMember(dbMember.iam);
}
