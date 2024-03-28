import {
  Heading1,
  InterceptModal,
  Paragraph1,
} from "@danklabs/pattern-library/core";
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
        <Heading1 className="text-2xl">Cake Invitations</Heading1>
        <Paragraph1>
          You start with two invitations, make sure you use them wisely and
          invite others you know will love Cake as much as you do!
        </Paragraph1>
        <div className="my-10">
          <InvitationsList />
        </div>
      </div>
    </>
  );
}
