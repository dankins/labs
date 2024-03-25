import { auth } from "@clerk/nextjs";
import { invitations } from "@danklabs/cake/services/admin-service";
import { InvitationListItem } from "./InvitationListItem";

export async function InvitationsList() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("not authenticated");
  }

  const list = await invitations.getMemberInvitations.cached(userId);

  return (
    <div>
      {list.map((i) => (
        <InvitationListItem key={i.id} invite={i} />
      ))}
    </div>
  );
}
