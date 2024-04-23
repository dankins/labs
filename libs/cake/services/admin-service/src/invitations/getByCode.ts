import { db, invitations } from "@danklabs/cake/db";
import { and, sql, eq, desc, isNull, count, max } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";

async function fn(code: string) {
  return db.query.invitations.findFirst({
    where: eq(invitations.code, code),
    with: {
      campaign: true,
    },
  });
}

function tag(code: string) {
  return `get-invitation-code-${code}`;
}

export const getByCode = {
  cached(invitationId: string) {
    return unstable_cache(fn, [tag(invitationId)], {
      tags: [tag(invitationId)],
    })(invitationId);
  },
  clearCache(code: string) {
    revalidateTag(tag(code));
  },
  nocache(invitationId: string) {
    return fn(invitationId);
  },
};
