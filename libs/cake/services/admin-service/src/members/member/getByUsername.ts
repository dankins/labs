import { db, members } from "@danklabs/cake/db";
import { getMember } from "./getMember";
import { Member } from "./types";
import { eq } from "drizzle-orm";

export async function getByUsername(username: string): Promise<Member> {
  const dbProfile = await db.query.profiles.findFirst({
    where: eq(members, username),
    with: {
      member: true,
    },
  });
  if (!dbProfile) {
    throw new Error(`Member not found`);
  }
  if (dbProfile.parentType !== "member") {
    throw new Error(`Member not found`);
  }

  return getMember(dbProfile.member.iam);
}
