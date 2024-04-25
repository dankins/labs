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
      <Heading3 className="font-supreme font-normal text-dark uppercase text-[27px]">
        Invite A Friend
      </Heading3>
      <Paragraph3 className="text-secondary text-lg font-selva font-normal text-[18px]">
        (a really good one)
      </Paragraph3>
      <Caption3 className="uppercase font-normal text-primary py-[8px]">
        {availableCount} {availableMessage}
      </Caption3>
      <PrimaryButton
        className="my-4 uppercase"
        href={`?action=share-invite&inviteId=${availableId}`}
      >
        Share Wisely
      </PrimaryButton>
    </div>
  );
}
