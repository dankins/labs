import { db, members, passports } from "@danklabs/cake/db";
import { clearCache } from "./clearCache";

export async function create(
  iam: string,
  data: Omit<typeof members.$inferInsert, "iam" | "createdAt" | "updatedAt">
) {
  const result = await db
    .insert(members)
    .values({
      iam,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    })
    .returning()
    .execute();

  const passport = (
    await db
      .insert(passports)
      .values({
        memberId: result[0].id,
      })
      .returning()
  )[0];

  clearCache(iam);

  return result[0];
}
