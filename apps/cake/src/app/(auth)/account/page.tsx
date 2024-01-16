import { Centered } from "@danklabs/pattern-library/core";
import { InvitationsList } from "./InvitationsList";

export default function Page() {
  return (
    <Centered>
      <h1>Invitations</h1>
      <InvitationsList />
    </Centered>
  );
}
