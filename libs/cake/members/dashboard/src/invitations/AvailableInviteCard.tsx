import {
  Heading3,
  LogoMark,
  Paragraph3,
  PrimaryButton,
} from "@danklabs/cake/pattern-library/core";
import { Caption1, Caption3 } from "@danklabs/pattern-library/core";

export function AvailableInviteCard({
  availableCount,
  totalCount,
  availableId,
}: {
  availableCount: number;
  totalCount: number;
  availableId: string;
}) {
  const availableMessage = availableCount > 1 ? "Invites" : "Invite";
  return (
    <div className="p-4 border border-[#E1DED9] bg-[#FBFAF8] flex flex-col items-center justify-center  ">
      <LogoMark className="text-xl fill-dark" />
      <Heading3 className="uppercase">Invite A Friend</Heading3>
      <Paragraph3 className="text-secondary text-lg font-selva">
        (a really good one)
      </Paragraph3>
      <Caption1 className="uppercase text-primary">
        {availableCount} {availableMessage}
      </Caption1>
      <PrimaryButton
        className="my-4 uppercase"
        href={`?action=share-invite&inviteId=${availableId}`}
      >
        Share Wisely
      </PrimaryButton>
    </div>
  );
}
