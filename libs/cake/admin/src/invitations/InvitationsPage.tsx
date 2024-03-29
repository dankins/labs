import {
  AdminPageHeader,
  Heading1,
  PageContent,
  PrimaryButton,
} from "@danklabs/pattern-library/core";
import { CreateCampaignInviteModal } from "./CreateCampaignInviteModal";
import { CampaignInvitesList } from "./CampaignInvitesList";

export async function InvitationsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      {searchParams && searchParams.action === "create" && (
        <CreateCampaignInviteModal />
      )}
      <PageContent>
        <div>
          <AdminPageHeader>
            <Heading1 className="text-3xl grow">Campaign Invitations</Heading1>

            <PrimaryButton className="self-align-end" href={`?action=create`}>
              Create
            </PrimaryButton>
          </AdminPageHeader>
        </div>
        <CampaignInvitesList />
      </PageContent>
    </>
  );
}
