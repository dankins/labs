import {
  Heading3,
  InterceptModal,
  FormAction,
  TextInput,
  NumericInput,
} from "@danklabs/pattern-library/core";
import { createCampaignInvitationAction } from "./actions";

export async function CreateCampaignInviteModal() {
  return (
    <InterceptModal returnHref={`/admin/invitations`}>
      <FormAction
        action={createCampaignInvitationAction}
        className="p-4 flex flex-col gap-4"
        cta="Create"
      >
        <Heading3>Create Campaign Invitation</Heading3>
        <TextInput name="campaign" label="Campaign Name" required />
        <TextInput name="code" label="Invite Code" required />
        <NumericInput
          name="maxRedemptions"
          label="Max # of Redemptions"
          min={0}
          step={1}
          required
        />
        <NumericInput
          name="revshare"
          label="Revenue Share %"
          min={0}
          max={100}
          step={1}
        />
        <NumericInput
          name="invitationsGranted"
          label="Invitations Granted"
          min={0}
        />
        <NumericInput
          name="collectionItemsGranted"
          label="Collection Items Granted"
          min={0}
        />
        <TextInput name="coupon" label="Stripe Coupon ID" />
      </FormAction>
    </InterceptModal>
  );
}
