import {
  Paragraph1,
  PrimaryButton,
  SecondaryButton,
} from "@danklabs/pattern-library/core";
import { cancelInviteAction } from "./actions";
import { auth } from "@clerk/nextjs";

export async function CancelInvite({ invitationId }: { invitationId: string }) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("no user id");
  }

  return (
    <div className="p-4 text-center flex flex-col gap-4">
      <Paragraph1>Are you sure you want to cancel this invitation?</Paragraph1>
      <Paragraph1>
        If cancelled, your link will become invalid and you will need to
        reactivate if you wish to use it again.
      </Paragraph1>
      <div className="flex flex-row gap-4 items-center justify-center">
        <form action={cancelInviteAction.bind(undefined, userId, invitationId)}>
          <PrimaryButton>Deactivate</PrimaryButton>
        </form>
        <div>
          <SecondaryButton href={`/account/invites`}>
            Keep Active
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
