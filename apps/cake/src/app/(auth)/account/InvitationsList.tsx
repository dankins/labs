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
import { ActivateInvitationButton } from "./ActivateInvitationButton";
import { activateInvitationAction, sendInvitationEmail } from "./actions";
import { InvitationLink } from "./InvitationLink";

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
    <div className="flex flex-col gap-3">
      {memberInvites.invitations.map((invitation, idx) => (
        <InvitationRow key={invitation.id} invitation={invitation} idx={idx} />
      ))}
    </div>
  );
}

function InvitationRow({
  invitation,
  idx,
}: {
  invitation: Invitation;
  idx: number;
}) {
  let content: React.ReactNode = (
    <InvitationNotActive invitation={invitation} />
  );
  if (invitation.redemptions >= invitation.maxRedemptions) {
    content = <InvitationRedeemed invitation={invitation} />;
  } else if (
    invitation.code &&
    invitation.redemptions < invitation.maxRedemptions
  ) {
    content = <InvitationActive invitation={invitation} />;
  }

  return (
    <div className="flex flex-row gap-4 items-center">
      <div>{idx + 1}</div>
      <div>{content}</div>
    </div>
  );
}

function InvitationNotActive({ invitation }: { invitation: Invitation }) {
  return (
    <div className="flex flex-row items-center gap-3">
      <div>Not activated</div>
      <ActivateInvitationButton
        invitationId={invitation.id}
        activateAction={activateInvitationAction}
      />
    </div>
  );
}

function InvitationActive({ invitation }: { invitation: Invitation }) {
  return (
    <div>
      <InvitationLink
        domain={process.env["VERCEL_URL"]!}
        code={invitation.code!}
        sendInvitationEmail={sendInvitationEmail}
      />
    </div>
  );
}

function InvitationRedeemed({ invitation }: { invitation: Invitation }) {
  return <div>REDEEMED</div>;
}
