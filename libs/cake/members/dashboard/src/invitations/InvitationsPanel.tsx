import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";

import { members } from "@danklabs/cake/services/admin-service";
import {
  Heading4,
  Paragraph1,
  Paragraph2,
  SecondaryButton,
  Spinner,
} from "@danklabs/pattern-library/core";
import { InvitationCard } from "./InvitationCard";

export async function InvitationsPanel() {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
}

function Loading() {
  return <Spinner />;
}

async function Component() {
  const { userId: iam } = auth().protect();
  const invitations = await members.member.invitations.getInvitations(iam);
  return (
    <div className="w-full">
      <div className="flex flex-col">
        <Heading4>My Invitations</Heading4>
        <Paragraph2>
          Share the exclusivity that is being a Cake member. Invite your friends
          to join you in and enjoy all of the benefits that come with being a
          member.
        </Paragraph2>
        <div className="my-5 flex flex-row justify-start">
          <SecondaryButton href={`/account/invites`}>
            View All Invites
          </SecondaryButton>
        </div>
      </div>
      {invitations.length === 0 && <div>You have no invitations</div>}
      {invitations.length > 0 && (
        <div className="flex flex-col gap-4">
          {invitations.map((invitation) => (
            <InvitationCard key={invitation.id} invitation={invitation} />
          ))}
        </div>
      )}
    </div>
  );
}
