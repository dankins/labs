import {
  Heading3,
  InterceptModal,
  FormAction,
  TextInput,
  NumericInput,
} from "@danklabs/pattern-library/core";
import { createCampaignAction } from "./actions";

export async function CreateCampaignModal() {
  return (
    <InterceptModal returnHref={`/admin/invitations`}>
      <FormAction
        action={createCampaignAction}
        className="p-4 flex flex-col gap-4"
        cta="Create"
      >
        <Heading3>Create Invitation Campaign</Heading3>
        <TextInput
          name="name"
          label="Campaign Name"
          required
          helperText="Name of the campaign"
        />
        <NumericInput
          name="invitationsGranted"
          label="Default # Invitations Granted"
          helperText="# of invitations the member will be able to send"
          min={0}
          defaultValue={2}
          step={1}
          required
        />
        <NumericInput
          name="collectionItemsGranted"
          label="Default # Collection Items Granted"
          helperText="# of collection items the member will be able to claim"
          min={0}
          defaultValue={10}
          step={1}
          required
        />
        <TextInput
          name="coupon"
          label="Stripe Coupon ID"
          helperText="Discount code to apply at checkout"
        />
        <TextInput
          name="memberEmail"
          label="Member Email"
          helperText="Email address of the member to associate this campaign with"
        />
        <NumericInput
          name="revshare"
          label="Revenue Share %"
          min={0}
          max={100}
          step={1}
          helperText="% of revenue to share with the associated member"
        />
      </FormAction>
    </InterceptModal>
  );
}
