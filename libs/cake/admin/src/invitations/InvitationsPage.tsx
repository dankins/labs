import {
  AdminPageHeader,
  Heading1,
  PageContent,
  PrimaryButton,
} from "@danklabs/pattern-library/core";
import { CreateCampaignModal } from "./CreateCampaignModal";
import { InvitationCampaignsList } from "./InvitationCampaignsList";
import { CreateInvitesModal } from "./CreateInvitesModal";
import { TrancheDetailModal } from "./TrancheDetailModal";

export async function InvitationsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      {searchParams && searchParams.action === "create" && (
        <CreateCampaignModal />
      )}
      {searchParams && searchParams.action === "create-invites" && (
        <CreateInvitesModal
          mode={searchParams["mode"] as string}
          campaignSlug={searchParams["campaign"] as string}
        />
      )}
      {searchParams && searchParams.action === "tranche_detail" && (
        <TrancheDetailModal
          campaignSlug={searchParams["campaign"] as string}
          tranche={searchParams["tranche"] as string}
          assign={searchParams["assign"] as string}
        />
      )}
      <PageContent>
        <div>
          <div className="mt-[90px] flex flex-row items-center p-6">
            <Heading1 className="text-3xl grow">Invitation Campaigns</Heading1>

            <PrimaryButton className="self-align-end" href={`?action=create`}>
              Create Campaign
            </PrimaryButton>
          </div>
        </div>
        <InvitationCampaignsList />
      </PageContent>
    </>
  );
}
