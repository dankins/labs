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
import { emailInviteAction, shareInviteAction } from "../actions";
import { ShareScreen } from "./ShareScreen";
import { invitations } from "@danklabs/cake/services/admin-service";
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
    return <ShareScreenModal returnHref={returnHref} inviteId={inviteId} />;
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

async function ShareScreenModal({
  returnHref,
  inviteId,
}: {
  returnHref: string;
  inviteId: string;
}) {
  return (
    <InterceptModal returnHref={returnHref}>
      <div className="mt-4 flex flex-row justify-end">
        <GhostButton size="lg" href={returnHref}>
          <CancelIcon />
        </GhostButton>
      </div>
      <ShareScreenModalComponent inviteId={inviteId} />
    </InterceptModal>
  );
}

async function ShareScreenModalComponent({ inviteId }: { inviteId: string }) {
  const invitation = await invitations.getInvitation.cached(inviteId);
  if (!invitation || !invitation.code || !invitation.recipientName) {
    return (
      <InterceptModal returnHref="/account/invites">
        Invalid invite
      </InterceptModal>
    );
  }
  return (
    <ShareScreen
      inviteCode={invitation.code}
      recipientName={invitation.recipientName}
      emailInviteAction={emailInviteAction.bind(
        undefined,
        invitation.memberId!,
        invitation.id,
        invitation.recipientName
      )}
    />
  );
}
