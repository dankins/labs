import { InterceptModal } from "@danklabs/pattern-library/core";
import { CancelInvite } from "./CancelInvite";
import { AssignInvite } from "./AssignInvite";
import { ShareInvite } from "./ShareInvite";

export function MaybeModal({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const action = searchParams["action"];
  if (!action) {
    return null;
  }
  const invitationId = searchParams["invitationId"] as string;
  if (!invitationId) {
    console.error("found action on invitation but no id", searchParams);
    return null;
  }

  if (action === "cancel") {
    return (
      <InterceptModal returnHref={`?`}>
        <CancelInvite invitationId={invitationId} />
      </InterceptModal>
    );
  } else if (action === "assign") {
    return (
      <InterceptModal returnHref={`?`}>
        <AssignInvite invitationId={invitationId} />
      </InterceptModal>
    );
  } else if (action === "share") {
    return (
      <InterceptModal returnHref={`?`}>
        <ShareInvite invitationId={invitationId} />
      </InterceptModal>
    );
  }

  return null;
}
