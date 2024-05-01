import { connections, db, profiles } from "@danklabs/cake/db";
import { members } from "..";
import { and, eq } from "drizzle-orm";
import { getProfile_clearCache } from "./getProfile";
import { profile } from "console";
import { getConnections_clearCache } from "./getConnections";

export async function addConnection(iam: string, username: string) {
  console.log("add connection", iam, username);

  const follower = await members.member.get(iam);
  if (!follower) {
    throw new Error("member not found");
  }
  if (!follower.profile) {
    throw new Error("profile not found");
  }
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.username, username),
    with: {
      member: true,
    },
  });
  if (!profile) {
    throw new Error("username not found");
  }

  // const member = await members.member.getByUsername(username);

  // query if the profile already follows the follower
  const existing = await db.query.connections.findFirst({
    where: and(
      eq(connections.followerId, profile.id),
      eq(connections.followsId, follower.profile.id)
    ),
  });

  let reciprocalId = null;
  if (existing) {
    reciprocalId = existing.id;
  }

  const result = await db
    .insert(connections)
    .values([
      {
        followerId: follower.profile.id,
        followsId: profile.id,
        reciprocalId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    .returning();
  getProfile_clearCache(iam, username);
  getConnections_clearCache(iam);

  if (reciprocalId) {
    const r = result[0];
    await db
      .update(connections)
      .set({
        reciprocalId: r.id,
      })
      .where(eq(connections.id, reciprocalId));
    if (profile.member) {
      getProfile_clearCache(profile.member.iam, follower.username!);
      getConnections_clearCache(profile.member.iam);
    }
  }
}
