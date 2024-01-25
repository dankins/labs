import { auth } from "@clerk/nextjs";
import { SectionHeading } from "@danklabs/cake/pattern-library/core";
import { getMemberInvitations } from "@danklabs/cake/services/admin-service";
import { Button, ClockIcon, TicketIcon } from "@danklabs/pattern-library/core";
import { Suspense } from "react";

export async function InvitationCard() {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
}

async function Component() {
  const userAuth = auth();
  if (!userAuth || !userAuth.userId) {
    throw new Error("user not authenticated");
  }
  const invites = await getMemberInvitations(userAuth.userId);

  if (!invites || invites.length === 0) {
    return <div>You have no invitations</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 flex-wrap">
      {invites.map((i) =>
        i.status === "UNUSED" ? (
          <OpenInvitations count={i.count} />
        ) : (
          <PendingInvitations count={i.count} />
        )
      )}
    </div>
  );
}

function OpenInvitations({ count }: { count: number }) {
  return (
    <Container>
      <div className="flex flex-row items-center gap-1">
        <TicketIcon className="fill-primary text-xl" />
        <span className="text-xs">{count}</span>
      </div>
      <div>
        <SectionHeading>Invitations</SectionHeading>
        <div className="text-xs font-medium mt-1">
          Share your love of Cake by inviting your friends!
        </div>
      </div>
      <div>
        <Button
          background="white"
          textColor="black"
          rounded="full"
          className="text-xs"
        >
          Invite
        </Button>
      </div>
    </Container>
  );
}

function PendingInvitations({ count }: { count: number }) {
  return (
    <Container>
      <div className="flex flex-row items-center gap-1">
        <ClockIcon className="fill-primary text-xl" />
        <span className="text-xs">{count}</span>
      </div>
      <div>
        <SectionHeading>Pending invitations</SectionHeading>
        <div className="text-xs font-medium mt-1">
          Track invitations you have sent to join Cake.
        </div>
      </div>
      <div>
        <Button
          background="[#B83CA4]"
          textColor="white"
          rounded="full"
          className="text-xs"
        >
          Manage
        </Button>
      </div>
    </Container>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full border border-[#FEDFDD] rounded-md p-4 flex flex-col w-1/2 gap-2">
      {children}
    </div>
  );
}
