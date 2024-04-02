import { db, invitations } from "@danklabs/cake/db";
import { getCampaign } from "./getCampaign";
import { and, asc, eq } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";

async function fn(campaignSlug: string, tranche: string) {
  const invitation = await getCampaign(campaignSlug);
  if (!invitation) {
    throw new Error("invitation not found");
  }

  return db.query.invitations.findMany({
    where: and(
      eq(invitations.campaignId, invitation.id),
      eq(invitations.tranche, tranche)
    ),
    with: {
      campaign: true,
    },
    orderBy: [asc(invitations.recipientName), asc(invitations.code)],
  });
}

export function getTrancheTag(campaignSlug: string, tranche: string) {
  return `get-invitation-tranche-${campaignSlug}-${tranche}`;
}

export async function getTrancheInvitations(
  campaignSlug: string,
  tranche: string
) {
  return unstable_cache(fn, [getTrancheTag(campaignSlug, tranche)], {
    tags: [getTrancheTag(campaignSlug, tranche)],
  })(campaignSlug, tranche);
}

export async function clearTrancheCache(campaignSlug: string, tranche: string) {
  revalidateTag(getTrancheTag(campaignSlug, tranche));
}
