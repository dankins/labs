import classNames from "classnames";
import { auth } from "@clerk/nextjs";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

import {
  ClockIcon,
  PrimaryButton,
  SecondaryButton,
  TicketIcon,
} from "@danklabs/pattern-library/core";
import { invitations } from "@danklabs/cake/services/admin-service";

type Invite = Awaited<
  ReturnType<typeof invitations.getMemberInvitations.cached>
>["0"];
type InvitationListItemProps = {
  invite: Invite;
};

export function InvitationListItem({ invite }: InvitationListItemProps) {
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

function AvailableInvite({ invite }: InvitationListItemProps) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("invalid user id");
  }
  return (
    <Container>
      <h1 className="text-lg font-medium">
        <TicketIcon /> 1 Available Invite
      </h1>

      <p className="text-sm font-normal text-primary">
        Share your love of Cake by inviting your friends!
      </p>
      <p className="grow"></p>
      <div>
        <div className="flex flex-row gap-2">
          <PrimaryButton href={`?action=assign&invitationId=${invite.id}`}>
            Send Invite
          </PrimaryButton>
        </div>
      </div>
    </Container>
  );
}

function PendingInvite({ invite }: InvitationListItemProps) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("invalid user id");
  }
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
          <PrimaryButton href={`?action=share&invitationId=${invite.id}`}>
            Send Again
          </PrimaryButton>
          <SecondaryButton href={`?action=cancel&invitationId=${invite.id}`}>
            Cancel
          </SecondaryButton>
        </div>
      </div>
    </Container>
  );
}

function ExpiredInvite({ invite }: InvitationListItemProps) {
  const expiration = dayjs(invite.expiration).format("L");
  return (
    <Container>
      <h1 className="text-lg font-medium">Invitation Expired</h1>
      <p className="text-sm font-normal">{invite.recipientName}</p>
      <p className="text-sm font-normal text-primary">Expired {expiration}</p>
      <p className="grow"></p>
      <div>
        <div className="flex flex-row gap-2">
          <PrimaryButton href={`?action=share&invitationId=${invite.id}`}>
            Send Again
          </PrimaryButton>
          <SecondaryButton href={`?action=cancel&invitationId=${invite.id}`}>
            Cancel
          </SecondaryButton>
        </div>
      </div>
    </Container>
  );
}

function AcceptedInvite({ invite }: InvitationListItemProps) {
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
