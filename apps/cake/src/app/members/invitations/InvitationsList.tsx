import { auth } from "@clerk/nextjs";
import {
  Member,
  db,
  invitations,
  members,
  Invitation,
} from "@danklabs/cake/db";
import { asc, eq } from "drizzle-orm";
import { Suspense } from "react";

export function InvitationsList() {
  return (
    <Suspense>
      <Loaded />
    </Suspense>
  );
}

async function Loaded() {
  const userAuth = auth();
  const memberInvites = await db.query.members.findFirst({
    where: eq(members.iam, userAuth.userId!),
    with: {
      invitations: {
        orderBy: [asc(invitations.expiration)],
      },
    },
  });

  memberInvites?.invitations;

  if (!memberInvites || memberInvites.invitations.length === 0) {
    return <div>You have no invitations</div>;
  }

  return (
    <div>
      {memberInvites.invitations.map((invitation) => (
        <InvitationRow invitation={invitation} />
      ))}
    </div>
  );
}

function InvitationRow({ invitation }: { invitation: Invitation }) {
  return <div>{invitation.id}</div>;
}
