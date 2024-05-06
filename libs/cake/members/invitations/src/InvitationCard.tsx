import { LogoMark } from "@danklabs/cake/pattern-library/core";
import { MemberInvitation } from "@danklabs/cake/services/admin-service";
import {
  Caption1,
  Heading3,
  Paragraph3,
  PrimaryButton,
  SecondaryButton,
} from "@danklabs/pattern-library/core";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

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
      <Heading3 className="uppercase font-supreme font-normal text-dark">
        Invite Shared
      </Heading3>
      <Paragraph3 className="text-lg font-selva py-[8px]">
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
      <Heading3 className="uppercase font-supreme font-normal text-dark ">
        Invite Shared
      </Heading3>
      <Paragraph3 className="text-lg font-selva py-[8px]">
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
    <div className="p-4 border border-[#E1DED9] bg-[#F9F6F2] flex flex-col items-center justify-center  ">
      <LogoMark className="text-xl fill-dark" />
      <Paragraph3 className="text-lg font-selva py-[8px]">
        {invitation.recipientName}
      </Paragraph3>
      <Caption1 className="uppercase text-secondary">
        Joined {dayjs(invitation.accepted).format("LL")}
      </Caption1>
    </div>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 border border-[#E1DED9] bg-[#FBFAF8] flex flex-col items-center justify-center  ">
      {children}
    </div>
  );
}
