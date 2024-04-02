import { db, invitationCampaigns } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

async function fn(slug: string) {
  return db.query.invitationCampaigns.findFirst({
    where: eq(invitationCampaigns.slug, slug),
  });
}

export function getCampaignTag(slug: string) {
  return `get-invitation-campaign-${slug}`;
}

export async function getCampaign(slug: string) {
  return unstable_cache(fn, [getCampaignTag(slug)], {
    tags: [getCampaignTag(slug)],
  })(slug);
}
