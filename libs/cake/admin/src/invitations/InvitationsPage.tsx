import {
  AdminPageHeader,
  Heading1,
  PageContent,
  PrimaryButton,
} from "@danklabs/pattern-library/core";
import { CreateCampaignModal } from "./CreateCampaignModal";
import { InvitationCampaignsList } from "./InvitationCampaignsList";
import { CreateInvitesModal } from "./CreateInvitesModal";

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
      <PageContent>
        <div>
          <AdminPageHeader>
            <Heading1 className="text-3xl grow">Invitation Campaigns</Heading1>

            <PrimaryButton className="self-align-end" href={`?action=create`}>
              Create
            </PrimaryButton>
          </AdminPageHeader>
        </div>
        <InvitationCampaignsList />
      </PageContent>
    </>
  );
}
