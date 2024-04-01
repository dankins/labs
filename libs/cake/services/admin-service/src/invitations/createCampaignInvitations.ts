import { db, invitations } from "@danklabs/cake/db";
import { generateInviteCode } from "./assignInvite";
import { getCampaign } from "./getCampaign";
import { NotNull } from "drizzle-orm";

type CampaignRtn = NonNullable<Awaited<ReturnType<typeof getCampaign>>>;

type InputDataMapping = {
  "single-use": {
    tranche: string;
    count: number;
    coupon?: string;
  };
  "multi-use": {
    tranche: string;
    code: string;
    maxRedemptions: number;
    coupon?: string;
  };
};

export async function createCampaignInvitations<
  T extends "single-use" | "multi-use"
>(campaignSlug: string, mode: T, input: InputDataMapping[T]) {
  const campaign = await getCampaign(campaignSlug);
  if (!campaign) {
    throw new Error("unable to find campaign");
  }
  if (mode === "multi-use") {
    return createMultiUseInvitations(
      campaign,
      input as InputDataMapping["multi-use"]
    );
  }
  if (mode === "single-use") {
    return createSingleUseInvitations(
      campaign,
      input as InputDataMapping["single-use"]
    );
  }
  throw new Error("invalid mode");
}

async function createSingleUseInvitations(
  campaign: CampaignRtn,
  input: InputDataMapping["single-use"]
) {
  console.log("createSingleUseInvitations", campaign, input);
  const invites: (typeof invitations.$inferInsert)[] = Array.from(
    { length: input.count },
    (_, i) => {
      return {
        tranche: input.tranche,
        campaignId: campaign.id,
        code: generateInviteCode(),
        maxRedemptions: 1,
        coupon: input.coupon,
        invitationsGranted: campaign.invitationsGranted,
        collectionItemsGranted: campaign.collectionItemsGranted,
        memberId: campaign.memberId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  );

  console.log("invites", invites);
  await db.insert(invitations).values(invites).execute();
}

async function createMultiUseInvitations(
  campaign: CampaignRtn,
  input: InputDataMapping["multi-use"]
) {
  console.log("createMultiUseInvitations", campaign, input);
  return {};
}
