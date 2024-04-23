import {
  db,
  invitationCampaigns,
  invitations,
  members,
} from "@danklabs/cake/db";
import { eq, isNotNull, max, sql, sum } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";

async function fn() {
  const results = await db
    .select({
      id: invitationCampaigns.id,
      campaign: invitationCampaigns.name,
      campaignSlug: invitationCampaigns.slug,
      campaignCollectionItems: max(invitationCampaigns.collectionItemsGranted),
      campaignInvitationsGranted: max(invitationCampaigns.invitationsGranted),
      memberId: members.id,
      memberIam: members.iam,
      tranche: invitations.tranche,
      redemptions: sum(invitations.redemptions),
      max_redemptions: sum(invitations.maxRedemptions),
      mode: sql<string>`case when count(${invitations.code}) = sum(${invitations.maxRedemptions}) then 'single-use' else 'multi-use' end`.as(
        "mode"
      ),
      code: sql<
        string[]
      >`case when count(${invitations.code}) = sum(${invitations.maxRedemptions}) then null else ARRAY_AGG(${invitations.code}) end`.as(
        "code"
      ),
    })
    .from(invitationCampaigns)
    .leftJoin(members, eq(invitationCampaigns.memberId, members.id))
    .leftJoin(invitations, eq(invitationCampaigns.id, invitations.campaignId))
    .groupBy(invitationCampaigns.id, members.id, invitations.tranche);

  let campaigns: {
    [key: string]: Omit<
      (typeof results)[0],
      "tranche" | "redemptions" | "max_redemptions" | "mode" | "code"
    > & {
      tranches: {
        tranche: string | null;
        redemptions: number | null;
        maxRedemptions: number | null;
        mode: string;
        code: string[];
      }[];
    };
  } = {};

  results.forEach((result) => {
    if (!campaigns[result.id]) {
      campaigns[result.id] = {
        id: result.id,
        campaign: result.campaign,
        campaignSlug: result.campaignSlug,
        campaignCollectionItems: result.campaignCollectionItems,
        campaignInvitationsGranted: result.campaignInvitationsGranted,
        memberId: result.memberId,
        memberIam: result.memberIam,
        tranches: [],
      };
    }

    if (result.tranche) {
      campaigns[result.id].tranches.push({
        tranche: result.tranche,
        redemptions: (result.redemptions && parseInt(result.redemptions)) || 0,
        maxRedemptions:
          (result.max_redemptions && parseInt(result.max_redemptions)) || 0,
        mode: result.mode,
        code: result.code,
      });
    }
  });

  return campaigns;
}

export function getCampaignsTag() {
  return `get-invitation-campaigns`;
}

export async function getCampaigns() {
  return unstable_cache(fn, [getCampaignsTag()], {
    tags: [getCampaignsTag()],
  })();
}

export async function getCampaigns_clearCache() {
  revalidateTag(getCampaignsTag());
}
