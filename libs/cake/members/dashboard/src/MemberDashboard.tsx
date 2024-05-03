import { CollectionPanel } from "./collection/CollectionPanel";
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
      {/* {searchParams && searchParams["collectionItem"] && (
        <CollectionItemInterceptModal
          slug={searchParams["collectionItem"] as string}
        />
      )} */}

      <div className="px-4 flex flex-col items-center">
        <div className="container flex flex-col md:flex-row md:justify-center md:items-start md:flex-wrap gap-6">
          <CollectionPanel searchParams={searchParams} />
          <div className="md:mt-[146px] md:w-[350px] flex flex-col md:justify-evenly gap-10">
            {/* <RewardsPanel /> */}
            {/* <InvitationsPanel /> */}
            {/* <StoriesPanel /> */}
          </div>
        </div>
      </div>
    </>
  );
}
