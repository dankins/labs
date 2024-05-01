import { connections, db } from "@danklabs/cake/db";
import { and, eq, isNotNull, isNull, or } from "drizzle-orm";
import { members } from "..";
import { revalidateTag, unstable_cache } from "next/cache";

export async function fn(iam: string, onlyRequests?: boolean) {
  const member = await members.member.get(iam);
  if (!member) {
    throw new Error("member not found");
  }
  if (!member.profile) {
    return [];
  }
  const profileId = member.profile.id;

  const where = onlyRequests
    ? and(
        eq(connections.followsId, profileId),
        isNull(connections.reciprocalId)
      )
    : and(eq(connections.followerId, profileId));

  const conn = await db.query.connections.findMany({
    where,
    with: {
      follower: true,
      follows: true,
    },
  });
  return conn;
}

function getConnections_tag(iam: string, onlyRequests?: boolean) {
  return `community-connections-${iam}-${onlyRequests}`;
}

export async function getConnections(iam: string, onlyRequests?: boolean) {
  return unstable_cache(fn, [getConnections_tag(iam, onlyRequests)], {
    tags: [getConnections_tag(iam, onlyRequests)],
  })(iam, onlyRequests);
}

export async function getConnections_clearCache(iam: string) {
  revalidateTag(getConnections_tag(iam));
  revalidateTag(getConnections_tag(iam, true));
}
