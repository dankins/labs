import classNames from "classnames";
import { auth } from "@clerk/nextjs/server";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

import {
  ClockIcon,
  Paragraph1,
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
  const { userId } = auth().protect();

  return (
    <Container>
      <h1 className="uppercase text-lg font-medium flex flex-row items-center gap-1">
        <TicketIcon /> Available Invitation
      </h1>

      <Paragraph1 className="text-md">
        Share your love of Cake by inviting your friends!
      </Paragraph1>
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
      <h1 className="uppercase  text-lg font-medium flex flex-row items-center gap-1">
        <ClockIcon /> Pending Invitation
      </h1>
      <Paragraph1 className="text-lg font-normal">
        {invite.recipientName}
      </Paragraph1>
      <Paragraph1 className="text-lg text-secondary">
        Expires {timeRemaining}
      </Paragraph1>
      <p className="grow"></p>
      <div>
        <div className="flex flex-row gap-2">
          <SecondaryButton href={`?action=share&invitationId=${invite.id}`}>
            Send Again
          </SecondaryButton>
          <SecondaryButton
            background="secondary"
            textColor="text-white"
            border="border-0"
            href={`?action=cancel&invitationId=${invite.id}`}
          >
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
      <h1 className="uppercase text-lg font-medium flex flex-row items-center gap-1">
        Invitation Expired
      </h1>
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
    <Container className="bg-[#F3ECE6] min-h-[5rem]">
      <h1 className="uppercase  text-lg font-medium flex flex-row items-center gap-1">
        Accepted
      </h1>
      <Paragraph1 className="text-lg font-normal">
        {invite.recipientName}
      </Paragraph1>
      <Paragraph1 className="text-sm text-secondary font-normal text-primary">
        Joined {dayjs(invite.createdAt).format("MMM YYYY")}
      </Paragraph1>
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
        "mb-4 p-3 flex flex-col min-h-[10rem] rounded border border-[#C2B7AC] w-[327px]",
        className
      )}
    >
      {children}
    </div>
  );
}
