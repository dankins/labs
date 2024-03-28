import { db, invitations } from "@danklabs/cake/db";
import { and, sql, eq, desc, isNull, count, max } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";

async function fn(invitationId: string) {
  return db.query.invitations.findFirst({
    where: eq(invitations.id, invitationId),
  });
}

function tag(invitationId: string) {
  return `get-invitation-${invitationId}`;
}

export const getInvitation = {
  cached(invitationId: string) {
    return unstable_cache(fn, [tag(invitationId)], {
      tags: [tag(invitationId)],
    })(invitationId);
  },
  clearCache(invitationId: string) {
    revalidateTag(tag(invitationId));
  },
  nocache(invitationId: string) {
    return fn(invitationId);
  },
};
