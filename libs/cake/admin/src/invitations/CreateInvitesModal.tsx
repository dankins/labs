import {
  Heading3,
  InterceptModal,
  FormAction,
  TextInput,
  NumericInput,
  SecondaryButton,
  PrimaryButton,
  TertiaryButton,
  CheckIcon,
} from "@danklabs/pattern-library/core";
import { createCampaignInvitationsAction } from "./actions";
import { admin } from "@danklabs/cake/services/admin-service";
import { CampaignData } from "./CampaignData";

export async function CreateInvitesModal({
  mode = "multi-use",
  campaignSlug,
}: {
  campaignSlug?: string;
  mode?: "single-use" | "multi-use" | string;
}) {
  if (!campaignSlug) {
    return (
      <InterceptModal returnHref={`/admin/invitations`}>
        Invalid State: No Campaign Slug found
      </InterceptModal>
    );
  }
  const campaign = await admin.invitations.getCampaign(campaignSlug);
  if (!campaign) {
    return <div>Could not find campaign</div>;
  }

  const linkBase = `/admin/invitations?action=create-invites&campaign=${campaign.slug}`;

  return (
    <InterceptModal returnHref={`/admin/invitations`}>
      <div className="p-6">
        <Heading3>Create Invitation Tranche</Heading3>
        <CampaignData campaign={campaign} />
        <div className="py-6 flex flex-row">
          {mode === "single-use" ? (
            <>
              <PrimaryButton
                className="w-1/2"
                href={`${linkBase}&mode=single-use`}
              >
                <CheckIcon /> Single Use
              </PrimaryButton>
              <TertiaryButton
                className="w-1/2"
                href={`${linkBase}&mode=multi-use`}
              >
                Multi Use
              </TertiaryButton>
            </>
          ) : (
            <>
              <TertiaryButton
                className="w-1/2"
                href={`${linkBase}&mode=single-use`}
              >
                Single Use
              </TertiaryButton>
              <PrimaryButton
                className="w-1/2"
                href={`${linkBase}&mode=multi-use`}
              >
                <CheckIcon /> Multi Use
              </PrimaryButton>
            </>
          )}
        </div>
        {mode === "single-use" ? (
          <CreateSingleUse campaignSlug={campaign.slug} />
        ) : (
          <CreateMultiUse campaignSlug={campaign.slug} />
        )}
      </div>
    </InterceptModal>
  );
}

export async function CreateSingleUse({
  campaignSlug,
}: {
  campaignSlug: string;
}) {
  return (
    <FormAction
      action={createCampaignInvitationsAction.bind(undefined, campaignSlug)}
      className="flex flex-col gap-4"
      cta="Generate Invitations"
    >
      <input type="hidden" name="mode" value="single-use" />
      <TextInput
        name="tranche"
        label="Tranche Name"
        required
        helperText="Name to identify this group of invitations"
      />
      <NumericInput
        name="count"
        label="Number of Codes"
        required
        helperText="Number of single-use codes to generate"
      />
      <NumericInput
        name="coupon"
        label="Override Coupon Code"
        helperText="Override the default coupon code for this tranche"
      />
    </FormAction>
  );
}

export async function CreateMultiUse({
  campaignSlug,
}: {
  campaignSlug: string;
}) {
  return (
    <FormAction
      action={createCampaignInvitationsAction.bind(undefined, campaignSlug)}
      className="flex flex-col gap-4"
      cta="Create Invitation"
    >
      <input type="hidden" name="mode" value="multi-use" />
      <TextInput
        name="tranche"
        label="Tranche Name"
        required
        helperText="Name to identify this group of invitations"
      />
      <TextInput
        name="code"
        label="Invite Code"
        required
        helperText="Number of single-use codes to generate"
      />
      <NumericInput
        name="maxRedemptions"
        label="Max Redemptions"
        helperText="The maximum number of times this code can be redeemed"
      />
      <NumericInput
        name="coupon"
        label="Override Coupon Code"
        helperText="Override the default coupon code for this tranche"
      />
    </FormAction>
  );
}
