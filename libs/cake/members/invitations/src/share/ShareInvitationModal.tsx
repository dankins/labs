import {
  CancelIcon,
  Checkbox,
  CopyIcon,
  EmailIcon,
  FormAction,
  GhostButton,
  Heading4,
  InterceptModal,
  Paragraph,
  PrimaryButton,
  SecondaryButton,
  TextArea,
  TextInput,
  UserIcon,
} from "@danklabs/pattern-library/core";
import { shareInviteAction } from "../actions";
export async function ShareInvitationModal({
  returnHref,
  inviteId,
  screen,
}: {
  returnHref: string;
  inviteId?: string;
  screen: "assign" | "share" | string;
}) {
  if (!inviteId) {
    return (
      <InterceptModal returnHref={returnHref}>
        No invite id provided
      </InterceptModal>
    );
  }
  if (screen === "share") {
    return (
      <InterceptModal returnHref={returnHref}>
        invite share screen
      </InterceptModal>
    );
  }
  return (
    <InterceptModal returnHref={returnHref}>
      <div className="mt-4 flex flex-row justify-end">
        <GhostButton size="lg" href={returnHref}>
          <CancelIcon />
        </GhostButton>
      </div>
      <FormAction
        action={shareInviteAction.bind(undefined, inviteId)}
        cta="CREATE INVITATION"
        className="p-4 flex flex-col gap-2"
      >
        <Heading4 key="title">Share Invite</Heading4>
        <Paragraph>
          Love Cake? Invite others to join you, and share the love.
        </Paragraph>
        <TextInput
          name="name"
          label="First Name"
          helperText="We'll never share your details. See our Privacy Policy."
          required
          icon={<UserIcon />}
        />
        <Checkbox
          name="showBrandSelections"
          label="Allow my friends to see my brand selections"
          helperText="Include your name and brand selections with your invitation to Cake."
          defaultChecked
        />
      </FormAction>
    </InterceptModal>
  );
}
