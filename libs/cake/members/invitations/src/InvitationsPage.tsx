import {
  Heading1,
  Heading4,
  InterceptModal,
  Paragraph1,
} from "@danklabs/pattern-library/core";
import { InvitationsList } from "./InvitationsList";

export async function InvitationsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <div className="container mb-24">
        <Heading4>Cake Invitations</Heading4>
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
