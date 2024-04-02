import { admin } from "@danklabs/cake/services/admin-service";

export function CampaignData({
  campaign,
}: {
  campaign: NonNullable<
    Awaited<ReturnType<typeof admin.invitations.getCampaign>>
  >;
}) {
  return (
    <div className="p-4 rounded-md bg-neutral/70 text-sm">
      <div>Campaign Name: {campaign.name}</div>
      <div>
        Coupon Code:{" "}
        {campaign.coupon ? <span>{campaign.coupon}</span> : <i>None</i>}
      </div>
      <div>
        # of Invites: <span>{campaign.invitationsGranted}</span>
      </div>
      <div>
        # of Collection Items: <span>{campaign.collectionItemsGranted}</span>
      </div>
    </div>
  );
}
