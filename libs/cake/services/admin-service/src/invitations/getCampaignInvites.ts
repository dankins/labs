import { db, invitations } from "@danklabs/cake/db";
import { eq, isNotNull } from "drizzle-orm";
import { unstable_cache } from "next/cache";

async function fn() {
  return db.query.invitations.findMany({
    where: isNotNull(invitations.campaign),
  });
}

export function getCampaignInvitesTag() {
  return `get-super-invites`;
}

export async function getCampaignInvites() {
  return unstable_cache(fn, [getCampaignInvitesTag()], {
    tags: [getCampaignInvitesTag()],
  })();
}
