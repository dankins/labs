import { db, members, passports, profiles } from "@danklabs/cake/db";
import { clearCache } from "./clearCache";

export const DEFAULT_MAX_COLLECTION_ITEMS = 10;

export async function create(
  iam: string,
  data: Omit<typeof members.$inferInsert, "iam" | "createdAt" | "updatedAt">,
  username?: string
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
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()
  )[0];

  const profile = (
    await db
      .insert(profiles)
      .values({
        parentType: "member",
        parentId: result[0].id,
        username: username || `member-${generateRandomString(8)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()
  )[0];

  clearCache(iam);

  return result[0];
}

function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = ""; // Initialize the result variable to store the random string

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}
