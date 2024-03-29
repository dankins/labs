import { Invitation, db, invitations } from "@danklabs/cake/db";
import { clearCampaignInvitesListCache } from "./clearCampaignInvitesListCache";

export async function createCampaignInvitation(input: {
  campaign: string;
  code: string;
  maxRedemptions: number;
  revshare?: number;
  invitationsGranted?: number;
  collectionItemsGranted?: number;
  coupon?: string;
}): Promise<Invitation> {
  const record: typeof invitations.$inferInsert = {
    maxRedemptions: input.maxRedemptions,
    code: input.code,
    coupon: input.coupon,
    campaign: input.campaign,
    revshare: input.revshare?.toString(),
    invitationsGranted: input.invitationsGranted,
    collectionItemsGranted: input.collectionItemsGranted,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await db
    .insert(invitations)
    .values(record)
    .returning()
    .execute();

  if (result.length === 0) {
    throw new Error("unable to create invitation");
  }

  clearCampaignInvitesListCache();

  return result[0];
}
