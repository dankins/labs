import {
  CancelIcon,
  FormAction,
  GhostButton,
  Heading4,
  InterceptModal,
  Paragraph1,
} from "@danklabs/pattern-library/core";
import { cancelInviteAction } from "../actions";

export async function CancelInvitationModal({
  returnHref,
  inviteId,
}: {
  returnHref: string;
  inviteId?: string;
}) {
  if (!inviteId) {
    return (
      <InterceptModal returnHref={returnHref}>
        No invite id provided
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
        action={cancelInviteAction.bind(undefined, inviteId, returnHref)}
        cta="CANCEL INVITATION"
        className="p-4 flex flex-col gap-2"
      >
        <input name="annie-are-you-ok" type="hidden" value="ok" />
        <Heading4 key="title">Cancel Invitation</Heading4>
        <Paragraph1>
          Cancelling this invitation will make the link invalid and will allow
          you to reassign it at a later date.
        </Paragraph1>
      </FormAction>
    </InterceptModal>
  );
}
