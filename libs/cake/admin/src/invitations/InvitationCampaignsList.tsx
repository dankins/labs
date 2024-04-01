import { invitations } from "@danklabs/cake/services/admin-service";
import {
  Heading1,
  Paragraph2,
  Paragraph4,
  PrimaryButton,
  SecondaryButton,
  Spinner,
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

async function Component() {
  const campaigns = await invitations.getCampaigns();

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
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div>
        <div className="w-full text-left grid grid grid-cols-4">
          <div>
            <Paragraph2>Campaign</Paragraph2>
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="w-full text-left grid grid grid-cols-4 items-center"
          >
            <div>{campaign.name}</div>
            <div></div>
            <div></div>
            <div>
              <div className="flex flex-row gap-2 w-[375px]">
                <SecondaryButton
                  href={`?action=create-invites&campaign=${campaign.slug}&mode=multi-use`}
                >
                  Create Multi-Use
                </SecondaryButton>
                <SecondaryButton
                  href={`?action=create-invites&campaign=${campaign.slug}&mode=single-use`}
                >
                  Create Single-Use
                </SecondaryButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
