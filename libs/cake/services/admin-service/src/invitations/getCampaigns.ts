import { db, invitations, invitationCampaigns } from "@danklabs/cake/db";
import { eq, isNotNull } from "drizzle-orm";
import { unstable_cache } from "next/cache";

async function fn() {
  return db.query.invitationCampaigns.findMany({
    with: {},
  });
}

export function getCampaignsTag() {
  return `get-invitation-campaigns`;
}

export async function getCampaigns() {
  return unstable_cache(fn, [getCampaignsTag()], {
    tags: [getCampaignsTag()],
  })();
}
