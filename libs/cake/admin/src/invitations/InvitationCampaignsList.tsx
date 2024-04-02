import { admin } from "@danklabs/cake/services/admin-service";
import {
  AddIcon,
  Badge,
  GhostButton,
  Heading1,
  Heading3,
  PrimaryButton,
  RightArrow,
  SecondaryButton,
  Spinner,
  StackIcon,
  TicketOutlineicon,
} from "@danklabs/pattern-library/core";
import { Suspense } from "react";

export async function InvitationCampaignsList() {
  return (
    <Suspense
      fallback={
        <div>
          <Spinner />
        </div>
      }
    >
      <Component />
    </Suspense>
  );
}

type Campaign = Awaited<
  ReturnType<typeof admin.invitations.getCampaigns>
>["key"];

async function Component() {
  const campaignMap = await admin.invitations.getCampaigns();
  let campaigns: (typeof campaignMap)["key"][] = [];
  Object.keys(campaignMap).map((key) => campaigns.push(campaignMap[key]));

  if (campaigns.length === 0) {
    return (
      <div className="py-20 bg-white/70 p-4 flex flex-col items-center align-center gap-5 ">
        <Heading1 className="text-2xl">
          No Invitation Campaigns have been created yet.
        </Heading1>
        <PrimaryButton href={`?action=create`}>Create Campaign</PrimaryButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <>
      <div
        key={campaign.id}
        className="w-full bg-white p-4 rounded-lg shadow-md"
      >
        <div className="flex flex-row gap-2">
          <Heading3 className="grow">{campaign.campaign}</Heading3>
          {campaign.campaignCollectionItems && (
            <Badge className="text-black/40">
              {campaign.campaignCollectionItems} brands
            </Badge>
          )}
          {campaign.campaignInvitationsGranted && (
            <Badge className="text-black/40">
              {campaign.campaignInvitationsGranted} invitations
            </Badge>
          )}
          <SecondaryButton
            href={`?action=create-invites&campaign=${campaign.campaignSlug}&mode=multi-use`}
            icon={<AddIcon />}
            size="sm"
          >
            Add Tranche
          </SecondaryButton>
        </div>
        <div className="my-5 flex flex-col">
          {campaign.tranches.map((tranche) => (
            <TrancheRow
              key={tranche.tranche}
              campaignSlug={campaign.campaignSlug}
              tranche={tranche}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function TrancheRow({
  campaignSlug,
  tranche,
}: {
  campaignSlug: string;
  tranche: Campaign["tranches"][0];
}) {
  return (
    <div className="p-2 flex flex-row items-center gap-4 hover:bg-gray-100">
      <div>
        {tranche.mode === "multi-use" ? <TicketOutlineicon /> : <StackIcon />}
      </div>
      <div>{tranche.tranche}</div>
      <div className="grow"></div>
      <div className="text-right flex flex-row gap-2 items-center">
        {tranche.mode === "multi-use" && (
          <Badge className="text-black/80">{tranche.code}</Badge>
        )}
        {tranche.redemptions} / {tranche.maxRedemptions}
      </div>

      <GhostButton
        href={`?action=tranche_detail&campaign=${campaignSlug}&tranche=${tranche.tranche}`}
        icon={<RightArrow />}
      ></GhostButton>
    </div>
  );
}
