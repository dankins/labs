import { Invitation } from "@danklabs/cake/db";
import { SectionHeading } from "@danklabs/cake/pattern-library/core";
import { MemberInvitation } from "@danklabs/cake/services/admin-service";
import {
  Button,
  Caption1,
  ClockIcon,
  Paragraph1,
  Paragraph2,
  PrimaryButton,
  SecondaryButton,
  TicketIcon,
} from "@danklabs/pattern-library/core";
import { Suspense } from "react";

export async function InvitationCard({
  invitation,
}: {
  invitation: MemberInvitation;
}) {
  switch (invitation.status) {
    case "UNUSED":
      return <OpenInvitation invitation={invitation} />;
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

function OpenInvitation({ invitation }: { invitation: MemberInvitation }) {
  return (
    <Container>
      <div className="flex flex-col gap-2">
        <Caption1>Invitation</Caption1>
        <Paragraph2 className="text-sm">
          Each invite is unique, and we trust our members to share wisely.
        </Paragraph2>
        <div>
          <SecondaryButton className="uppercase" size="sm">
            Invite
          </SecondaryButton>
        </div>
      </div>
    </Container>
  );
}

function PendingInvitation({ invitation }: { invitation: MemberInvitation }) {
  return (
    <Container>
      <div className="flex flex-row items-center gap-1">
        <ClockIcon className="fill-primary text-xl" />
        <span className="text-xs">pending</span>
      </div>
      <div>
        <SectionHeading>Pending Invitation</SectionHeading>
        <Paragraph1>Track invitations you have sent to join Cake.</Paragraph1>
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

function ExpiredInvitation({ invitation }: { invitation: MemberInvitation }) {
  return (
    <Container>
      <div className="flex flex-row items-center gap-1">
        <ClockIcon className="fill-primary text-xl" />
        <span className="text-xs">expired</span>
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
    <div className="w-full border darkSection bg-black rounded-sm p-4 flex flex-col gap-2">
      {children}
    </div>
  );
}
