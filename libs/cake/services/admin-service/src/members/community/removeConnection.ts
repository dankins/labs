import { connections, db, profiles } from "@danklabs/cake/db";
import { members } from "..";
import { and, eq } from "drizzle-orm";
import { getProfile_clearCache } from "./getProfile";
import { getConnections_clearCache } from "./getConnections";

export async function removeConnection(iam: string, username: string) {
  console.log("remove connection", iam, username);

  const follower = await members.member.get(iam);
  if (!follower) {
    throw new Error("member not found");
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

  // query if the profile already follows the follower
  const existing = await db.query.connections.findFirst({
    where: and(
      eq(connections.followerId, profile.id),
      eq(connections.followsId, follower.id)
    ),
  });

  await db
    .delete(connections)
    .where(
      and(
        eq(connections.followerId, follower.id),
        eq(connections.followsId, profile.id)
      )
    );

  getProfile_clearCache(iam, username);
  getConnections_clearCache(iam);

  // if the connection is reciprocal, remove the reciprocalId
  if (existing?.reciprocalId) {
    await db
      .update(connections)
      .set({
        reciprocalId: null,
      })
      .where(eq(connections.id, existing.id));
    if (profile.member) {
      getProfile_clearCache(profile.member.iam, follower.username!);
      getConnections_clearCache(profile.member.iam);
    }
  }
}
