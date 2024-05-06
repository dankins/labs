import slugify from "slugify";
import { Profile } from "../../types";
import { connections, db, profiles } from "@danklabs/cake/db";
import { members } from "..";
import { and, eq } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";

async function fn(requestorIam: string, username: string): Promise<Profile> {
  const normalizedUsername = slugify(username, { lower: true });
  const requestorMember = await members.member.get(requestorIam);
  if (!requestorMember) {
    throw new Error("member not found");
  }
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.username, normalizedUsername),
  });
  if (!profile) {
    throw new Error("profile not found");
  }

  const conn =
    requestorMember.profile &&
    (await db.query.connections.findFirst({
      where: and(
        eq(connections.followerId, requestorMember.profile.id),
        eq(connections.followsId, profile.id)
      ),
    }));

  let relationship: Profile["relationship"] = "public";
  if (conn) {
    relationship = conn.reciprocalId ? "connected" : "followed";
  } else if (requestorMember.id === profile.parentId) {
    relationship = "you";
  }

  return {
    relationship,
    profile: { username: profile.username, type: profile.parentType },
  };
}

export function getProfile_tag(requestorIam: string, username: string) {
  return `get-profile-${username}-${requestorIam}`;
}

export async function getProfile(
  requestorIam: string,
  username: string
): Promise<Profile> {
  return unstable_cache(fn, [getProfile_tag(requestorIam, username)], {
    tags: [getProfile_tag(requestorIam, username)],
  })(requestorIam, username);
}

export async function getProfile_clearCache(
  requestorIam: string,
  username: string
) {
  console.log("getProfile_clearCache", requestorIam, username);
  revalidateTag(getProfile_tag(requestorIam, username));
}
