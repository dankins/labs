import { AddIcon } from "@danklabs/pattern-library/core";
import Link from "next/link";
import { CollectionPanel } from "./collection/CollectionPanel";
import { InvitationsPanel } from "./invitations/InvitationsPanel";
import { RewardsPanel } from "./rewards/RewardsPanel";
import { StoriesPanel } from "./stories/StoriesPanel";
import { MobileNavSpacer } from "@danklabs/cake/pattern-library/core";
import { CollectionItemInterceptModal } from "./collection-item";

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
      <div className="p-4 flex flex-col items-center">
        <div className="container flex flex-col md:flex-row gap-6">
          <MobileNavSpacer />
          <div className="mb-[20px] md:mt-[48px] md:w-full">
            <CollectionPanel />
          </div>
          <div className="md:mt-[46px] md:w-[1/3] flex flex-col md:justify-evenly gap-10">
            <InvitationsPanel />
            <RewardsPanel />
            <StoriesPanel />
          </div>
        </div>
      </div>
    </>
  );
}
