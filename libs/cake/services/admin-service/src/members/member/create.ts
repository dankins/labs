import { db, members, passports } from "@danklabs/cake/db";
import { clearCache } from "./clearCache";

export const DEFAULT_MAX_COLLECTION_ITEMS = 10;

export async function create(
  iam: string,
  data: Omit<typeof members.$inferInsert, "iam" | "createdAt" | "updatedAt">
) {
  console.log("creating member", iam, data);
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
