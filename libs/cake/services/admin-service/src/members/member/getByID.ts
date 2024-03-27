import { unstable_cache } from "next/cache";
import { db, members } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { cachedGetMember } from "./getMember";
import { Member } from "./types";

async function getByID(memberId: string): Promise<Member> {
  const dbMember = await db.query.members.findFirst({
    where: eq(members.id, memberId),
  });
  if (!dbMember) {
    throw new Error(`Member not found`);
  }
  return cachedGetMember(dbMember.iam);
}

export async function cachedGetById(memberId: string) {
  const fn = unstable_cache(getByID, [`get-member-by-id-${memberId}`], {
    tags: [`get-member-by-id-${memberId}`],
  });

  return fn(memberId);
}
