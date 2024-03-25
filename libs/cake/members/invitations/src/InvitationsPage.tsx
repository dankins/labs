import { Heading1, InterceptModal } from "@danklabs/pattern-library/core";
import { InvitationsList } from "./InvitationsList";
import { MaybeModal } from "./MaybeModal";

export async function InvitationsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <MaybeModal searchParams={searchParams} />
      <div className="px-5 container mb-24">
        <Heading1 className="text-2xl">My Invitations</Heading1>
        <InvitationsList />
      </div>
    </>
  );
}
