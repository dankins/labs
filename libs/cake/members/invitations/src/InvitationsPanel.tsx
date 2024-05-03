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
import { AvailableInviteCard } from "./AvailableInviteCard";
import dayjs from "dayjs";

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
  const groupedInvitation = invitations.reduce(
    (acc, invitation) => {
      if (invitation.status === "UNUSED") {
        acc.available++;
        acc.availableId = invitation.id;
      } else if (
        invitation.status === "PENDING" ||
        invitation.status === "EXPIRED" ||
        (invitation.status === "ACCEPTED" &&
          invitation.expiration &&
          dayjs().subtract(1, "day").isBefore(invitation.expiration))
      ) {
        acc.active.push(invitation);
        return acc;
      }
      return acc;
    },
    { available: 0, active: [] } as {
      available: number;
      availableId?: string;
      active: typeof invitations;
    }
  );
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col my-2">
        <Heading4>Invitations</Heading4>
      </div>
      {groupedInvitation.available > 0 && (
        <AvailableInviteCard
          availableCount={groupedInvitation.available}
          totalCount={invitations.length}
          availableId={groupedInvitation.availableId!}
        />
      )}
      {groupedInvitation.active.length > 0 && (
        <div className="flex flex-col gap-4">
          {groupedInvitation.active.map((invitation) => (
            <InvitationCard key={invitation.id} invitation={invitation} />
          ))}
        </div>
      )}
    </div>
  );
}
