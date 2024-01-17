import { db, passports } from "@danklabs/cake/db";

export async function createMemberPassport(memberId: string) {
  // create the passport
  const passport = (
    await db
      .insert(passports)
      .values({
        memberId,
      })
      .returning()
  )[0];

  return passport;
}
