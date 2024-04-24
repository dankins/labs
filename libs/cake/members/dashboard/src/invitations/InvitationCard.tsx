import { Invitation } from "@danklabs/cake/db";
import { LogoMark, SectionHeading } from "@danklabs/cake/pattern-library/core";
import { MemberInvitation } from "@danklabs/cake/services/admin-service";
import {
  Button,
  Caption1,
  ClockIcon,
  Heading3,
  Paragraph1,
  Paragraph3,
  PrimaryButton,
  SecondaryButton,
  TicketIcon,
} from "@danklabs/pattern-library/core";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export async function InvitationCard({
  invitation,
}: {
  invitation: MemberInvitation;
}) {
  switch (invitation.status) {
    case "UNUSED":
      return <></>;
    case "PENDING":
      return <PendingInvitation invitation={invitation} />;
    case "EXPIRED":
      return <ExpiredInvitation invitation={invitation} />;
    case "ACCEPTED":
      return <AcceptedInvitation invitation={invitation} />;
    default:
      throw new Error("invalid inviation status");
  }
}

function PendingInvitation({ invitation }: { invitation: MemberInvitation }) {
  return (
    <div className="p-4 border border-[#E1DED9] bg-[#FBFAF8] flex flex-col items-center justify-center  ">
      <LogoMark className="text-xl fill-dark" />
      <Heading3 className="uppercase">Invite Shared</Heading3>
      <Paragraph3 className="text-lg font-selva">
        {invitation.recipientName}
      </Paragraph3>
      <Caption1 className="uppercase text-secondary">
        {dayjs().to(dayjs(invitation.expiration), true)} remaining
      </Caption1>
      <div className="my-4 flex flex-row gap-2 items-center justify-center">
        <PrimaryButton
          className="uppercase"
          href={`?action=share-invite&inviteId=${invitation.id}&screen=share`}
        >
          RESEND
        </PrimaryButton>
        <SecondaryButton
          className="uppercase"
          href={`?action=cancel-invite&inviteId=${invitation.id}`}
        >
          CANCEL
        </SecondaryButton>
      </div>
    </div>
  );
}

function ExpiredInvitation({ invitation }: { invitation: MemberInvitation }) {
  return (
    <div className="p-4 border border-[#E1DED9] bg-[#FBFAF8] flex flex-col items-center justify-center  ">
      <LogoMark className="text-xl fill-dark" />
      <Heading3 className="uppercase">Invite Shared</Heading3>
      <Paragraph3 className="text-lg font-selva">
        {invitation.recipientName}
      </Paragraph3>
      <Caption1 className="uppercase text-secondary">
        Expired {dayjs().to(dayjs(invitation.expiration))}
      </Caption1>
      <div className="my-4 flex flex-row gap-2 items-center justify-center">
        <PrimaryButton
          className="uppercase"
          href={`?action=share-invite&inviteId=${invitation.id}&screen=refresh-expired`}
        >
          RESEND
        </PrimaryButton>
        <SecondaryButton
          className="uppercase"
          href={`?action=cancel-invite&inviteId=${invitation.id}`}
        >
          CANCEL
        </SecondaryButton>
      </div>
    </div>
  );
}
function AcceptedInvitation({ invitation }: { invitation: MemberInvitation }) {
  return (
    <Container>
      <div className="flex flex-row items-center gap-1">
        <ClockIcon className="fill-primary text-xl" />
        <span className="text-xs">accept</span>
      </div>
      <div>
        <SectionHeading>Pending invitations</SectionHeading>
        <div className="text-xs font-medium mt-1">
          Track invitations you have sent to join Cake.
        </div>
      </div>
      <div>
        <SecondaryButton>Manage</SecondaryButton>
      </div>
    </Container>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full border darkSection bg-neutral text-neutral-content rounded-sm p-4 flex flex-col gap-2">
      {children}
    </div>
  );
}
