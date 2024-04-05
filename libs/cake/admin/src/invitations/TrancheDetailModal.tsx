import { admin } from "@danklabs/cake/services/admin-service";
import {
  CopyIcon,
  ExternalLinkIcon,
  GhostButton,
  Heading1,
  Heading2,
  Heading3,
  InterceptModal,
  SecondaryButton,
} from "@danklabs/pattern-library/core";
import { CampaignData } from "./CampaignData";
import { AssignInvitation } from "./AssignInvitation";
import { CopyButton } from "@danklabs/pattern-library/motion";

export async function TrancheDetailModal({
  campaignSlug,
  tranche: trancheInput,
  assign,
}: {
  campaignSlug?: string;
  tranche?: string;
  assign?: string;
}) {
  if (!campaignSlug || !trancheInput) {
    return (
      <InterceptModal returnHref={`/admin/invitations`}>
        Invalid State: No Campaign Slug found
      </InterceptModal>
    );
  }
  const trancheInvitations = await admin.invitations.getTrancheInvitations(
    campaignSlug,
    trancheInput
  );
  if (!trancheInvitations || trancheInvitations.length === 0) {
    return <div>Could not find campaign tranche</div>;
  }
  const trancheDetail = trancheInvitations[0];
  const campaign = trancheInvitations[0].campaign;
  if (!campaign) {
    return <div>Could not find campaign</div>;
  }

  return (
    <InterceptModal returnHref={`/admin/invitations`}>
      <div className="p-6 mt-6">
        <Heading3>Tranche: {trancheDetail.tranche}</Heading3>
        <div className="p-4 rounded-md bg-neutral/70 text-sm">
          <div>Campaign Name: {campaign.name}</div>
          <div>
            <span>Coupon Code:</span>{" "}
            {!trancheDetail.coupon && !campaign.coupon && <i>None</i>}
            {trancheDetail.coupon && !campaign.coupon && (
              <span>{campaign.coupon} (Campaign)</span>
            )}
            {trancheDetail.coupon && campaign.coupon && (
              <span>
                {trancheDetail.coupon} (Overrides Campaign ${campaign.coupon})
              </span>
            )}
          </div>
          <div>
            # of Invites: <span>{trancheDetail.invitationsGranted}</span>
          </div>
          <div>
            # of Collection Items:{" "}
            <span>{trancheDetail.collectionItemsGranted}</span>
          </div>
        </div>
        <div>
          {trancheInvitations.length === 1 ? (
            <MultiUse />
          ) : (
            <SingleUse
              campaignSlug={campaignSlug}
              tranche={trancheInput}
              assign={assign}
              invitations={trancheInvitations}
            />
          )}
        </div>
      </div>
    </InterceptModal>
  );
}

export function SingleUse({
  campaignSlug,
  tranche,
  invitations,
  assign,
}: {
  campaignSlug?: string;
  tranche?: string;
  invitations: NonNullable<
    Awaited<ReturnType<typeof admin.invitations.getTrancheInvitations>>
  >;
  assign?: string;
}) {
  return (
    <>
      <Heading1 className="mt-6 text-lg">Single Use Codes</Heading1>
      <div className="flex flex-col">
        {invitations.map((invitation) => (
          <div
            key={invitation.id}
            className="group even:bg-neutral/50 p-2 text-xs"
          >
            <div>
              <div className="group p-2 text-xs flex flex-row items-center min-h-16">
                <div className="grow">
                  <div>
                    <div className="text-lg">
                      {invitation.recipientName ? (
                        <span className="text-lg text-gray-600">
                          {invitation.recipientName}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500 italic">
                          Unassigned
                        </span>
                      )}
                    </div>
                    <div className="text-gray-400">{invitation.code}</div>
                  </div>
                </div>
                {invitation.recipientName ? (
                  <AssignedButtons code={invitation.code!} />
                ) : (
                  <UnassignedButtons
                    assign={assign}
                    campaignSlug={campaignSlug}
                    tranche={tranche}
                    invitationId={invitation.id}
                  />
                )}
              </div>
            </div>

            {assign === invitation.id && !invitation.recipientName && (
              <AssignInvitation invitation={invitation} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function AssignedButtons({ code }: { code: string }) {
  const link = `${process.env["NEXT_PUBLIC_SITE_URL"]}invitation?code=${code}`;
  return (
    <div className="invisible group-hover:visible flex flex-row items-center">
      <GhostButton size="md" href={link} icon={<ExternalLinkIcon />} />
      <CopyButton size="md" text={link} as="ghost" icon={<CopyIcon />} />
    </div>
  );
}

function UnassignedButtons({
  assign,
  campaignSlug,
  invitationId,
  tranche,
}: {
  campaignSlug?: string;
  invitationId?: string;
  tranche?: string;
  assign?: string;
}) {
  if (assign !== invitationId) {
    return (
      <SecondaryButton
        size="sm"
        className="invisible group-hover:visible"
        href={`/admin/invitations?action=tranche_detail&campaign=${campaignSlug}&tranche=${tranche}&assign=${invitationId}`}
      >
        Assign
      </SecondaryButton>
    );
  }
  return (
    <SecondaryButton
      size="sm"
      className="invisible group-hover:visible"
      href={`/admin/invitations?action=tranche_detail&campaign=${campaignSlug}&tranche=${tranche}`}
    >
      Cancel
    </SecondaryButton>
  );
}

export function MultiUse() {
  return <div>MultiUse</div>;
}
