import { db, profiles } from "@danklabs/cake/db";
import { isPostgresError } from "@danklabs/utils";
import { and, eq } from "drizzle-orm";
import slugify from "slugify";
import { member } from "../member";

export async function updateUsername(iam: string, username: string) {
  const memberResult = await member.get(iam);
  const normalizedUsername = slugify(username, { lower: true });

  if (normalizedUsername.startsWith("member-")) {
    throw new Error("Invalid username");
  }

  if (!memberResult.profile) {
    await db.insert(profiles).values({
      parentId: memberResult.id,
      parentType: "member",
      username: normalizedUsername,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    member.clearCache(iam);
    return;
  }

  try {
    await db
      .update(profiles)
      .set({ username: normalizedUsername })
      .where(
        and(
          eq(profiles.parentId, memberResult.id),
          eq(profiles.parentType, "member")
        )
      );
  } catch (err) {
    if (err === isPostgresError) {
      console.log("postgres err", err);
      throw new Error("Unable to assign username");
    }
    throw err;
  }

  member.clearCache(iam);
}
