import { InvitationsPanel } from "./InvitationsPanel";
import { CancelInvitationModal } from "./share/CancelInvitationModal";
import { ShareInvitationModal } from "./share/ShareInvitationModal";

export async function InvitationsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      {searchParams &&
        searchParams["action"] &&
        searchParams["action"] === "share-invite" && (
          <ShareInvitationModal
            returnHref="/account/invites"
            inviteId={searchParams["inviteId"] as string}
            screen={(searchParams["screen"] as string) || "assign"}
          />
        )}
      {searchParams && searchParams["action"] === "cancel-invite" && (
        <CancelInvitationModal
          returnHref="/account/invites"
          inviteId={searchParams["inviteId"] as string}
        />
      )}
      <InvitationsPanel />
    </>
  );
}
