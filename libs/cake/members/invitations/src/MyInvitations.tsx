import classNames from "classnames";
import { Suspense, useMemo } from "react";
import { auth } from "@clerk/nextjs";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

import { getMemberInvitations } from "@danklabs/cake/services/admin-service";
import {
  ActionButton,
  Button,
  ClockIcon,
  TicketIcon,
} from "@danklabs/pattern-library/core";
import {
  assignInviteAction,
  cancelInviteAction,
  emailInviteAction,
} from "./actions";
import { InviteActionButton } from "./NewInviteBottomSheet";
import { CancelInviteButton } from "./CancelInviteButton";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export async function MyInvitations() {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
}

async function Component() {
  const userAuth = auth();
  if (!userAuth || !userAuth.userId) {
    throw new Error("not authenticated");
  }

  const invites = await getMemberInvitations(userAuth.userId);

  return (
    <div>
      <h1 className="underline mb-4">My Invitations</h1>
      {invites.map((i) => (
        <InviteContainer key={i.id} invite={i} />
      ))}
    </div>
  );
}

type Invite = Awaited<ReturnType<typeof getMemberInvitations>>["0"];

type InviteContainerProps = {
  invite: Invite;
};

function InviteContainer({ invite }: InviteContainerProps) {
  switch (invite.status) {
    case "UNUSED":
      return <AvailableInvite invite={invite} />;
    case "PENDING":
      return <PendingInvite invite={invite} />;
    case "EXPIRED":
      return <ExpiredInvite invite={invite} />;
    case "ACCEPTED":
      return <AcceptedInvite invite={invite} />;
    default:
      throw new Error("unsupported status");
  }
}

function AvailableInvite({ invite }: InviteContainerProps) {
  return (
    <Container>
      <h1 className="text-lg font-medium">
        <TicketIcon /> {invite.count} Available Invite
        {invite.count > 1 ? "s" : undefined}
      </h1>

      <p className="text-sm font-normal text-primary">
        Share your love of Cake by inviting your friends!
      </p>
      <p className="grow"></p>
      <div>
        <div className="flex flex-row gap-2">
          <InviteActionButton
            cta="Send Invite"
            assignInviteAction={assignInviteAction.bind(undefined, invite.id)}
            emailInviteAction={emailInviteAction.bind(
              undefined,
              invite.id,
              invite.code!
            )}
          />
        </div>
      </div>
    </Container>
  );
}

function PendingInvite({ invite }: InviteContainerProps) {
  const timeRemaining = dayjs().to(invite.expiration);
  return (
    <Container>
      <h1 className="text-lg font-medium">
        <ClockIcon /> Pending Invitation
      </h1>
      <p className="text-sm font-normal">{invite.recipientName}</p>
      <p className="text-sm font-normal text-primary">
        Expires {timeRemaining}
      </p>
      <p className="grow"></p>
      <div>
        <div className="flex flex-row gap-2">
          <InviteActionButton
            cta="Send Again"
            onlyShare
            assignInviteAction={assignInviteAction.bind(undefined, invite.id)}
            emailInviteAction={emailInviteAction.bind(
              undefined,
              invite.id,
              invite.code!
            )}
            invite={invite}
          />
          <CancelInviteButton
            cancelInviteAction={cancelInviteAction.bind(undefined, invite.id)}
          />
        </div>
      </div>
    </Container>
  );
}

function ExpiredInvite({ invite }: InviteContainerProps) {
  const expiration = dayjs(invite.expiration).format("L");
  return (
    <Container>
      <h1 className="text-lg font-medium">Invitation Expired</h1>
      <p className="text-sm font-normal">{invite.recipientName}</p>
      <p className="text-sm font-normal text-primary">Expired {expiration}</p>
      <p className="grow"></p>
      <div>
        <div className="flex flex-row gap-2">
          <InviteActionButton
            cta="Send Again"
            assignInviteAction={assignInviteAction.bind(undefined, invite.id)}
            emailInviteAction={emailInviteAction.bind(
              undefined,
              invite.id,
              invite.code!
            )}
          />
          <ActionButton action={cancelInviteAction.bind(undefined, invite.id)}>
            Cancel
          </ActionButton>
        </div>
      </div>
    </Container>
  );
}

function AcceptedInvite({ invite }: InviteContainerProps) {
  return (
    /** TODO(dankins): don't use hard-coded color here   */
    <Container className="bg-[#544443] min-h-[5rem]">
      <h1 className="text-base font-medium">Invitation Accepted!</h1>
      <p className="text-sm font-normal">josh@alphaminer.com</p>
      <p className="text-sm font-normal text-primary">Joined 02/01/2023</p>
    </Container>
  );
}

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={classNames(
        "mb-4 p-3 flex flex-col min-h-[10rem] rounded border border-primary",
        className
      )}
    >
      {children}
    </div>
  );
}
