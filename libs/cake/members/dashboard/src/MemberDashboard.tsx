import { CollectionPanel } from "./collection/CollectionPanel";
import { InvitationsPanel } from "./invitations/InvitationsPanel";
import { CollectionItemInterceptModal } from "./collection-item";
import {
  CancelInvitationModal,
  ShareInvitationModal,
} from "@danklabs/cake/members/invitations";

export async function MemberDashboard({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      {searchParams && searchParams["collectionItem"] && (
        <CollectionItemInterceptModal
          slug={searchParams["collectionItem"] as string}
        />
      )}
      {searchParams &&
        searchParams["action"] &&
        searchParams["action"] === "share-invite" && (
          <ShareInvitationModal
            returnHref="/collection"
            inviteId={searchParams["inviteId"] as string}
            screen={(searchParams["screen"] as string) || "assign"}
          />
        )}
      {searchParams && searchParams["action"] === "cancel-invite" && (
        <CancelInvitationModal
          returnHref="/collection"
          inviteId={searchParams["inviteId"] as string}
        />
      )}
      <div className="p-4 flex flex-col items-center">
        <div className="container flex flex-col md:flex-row md:justify-center md:items-start md:flex-wrap gap-6">
          <CollectionPanel />
          <div className="md:mt-[146px] md:w-[350px] flex flex-col md:justify-evenly gap-10">
            {/* <RewardsPanel /> */}
            <InvitationsPanel />
            {/* <StoriesPanel /> */}
          </div>
        </div>
      </div>
    </>
  );
}
