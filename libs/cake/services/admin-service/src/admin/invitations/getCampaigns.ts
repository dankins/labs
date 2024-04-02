import {
  db,
  invitationCampaigns,
  invitations,
  members,
} from "@danklabs/cake/db";
import { eq, isNotNull, sql, sum } from "drizzle-orm";
import { unstable_cache } from "next/cache";

async function fn() {
  const results = await db
    .select({
      id: invitationCampaigns.id,
      campaign: invitationCampaigns.name,
      campaign_slug: invitationCampaigns.slug,
      member_id: members.id,
      member_iam: members.iam,
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
    [key: string]: {
      id: string;
      campaign: string;
      campaignSlug: string;
      memberId: string | null;
      memberIam: string | null;
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
        campaignSlug: result.campaign_slug,
        memberId: result.member_id,
        memberIam: result.member_iam,
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
