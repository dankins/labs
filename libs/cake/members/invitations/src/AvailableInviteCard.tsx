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
  return (
    <div className="p-4 border border-[#E1DED9] bg-[#FBFAF8] flex flex-col items-center justify-center  ">
      <LogoMark className="m-2 h-[18px] w-[18px] fill-dark" />
      <Heading3 className="font-supreme font-normal text-dark uppercase text-[22px]">
        Invite A Friend
      </Heading3>
      <Paragraph3 className="text-secondary text-lg font-selva font-normal text-[18px]">
        (a really good one)
      </Paragraph3>
      <Caption3 className="uppercase font-normal text-primary py-[8px]">
        {availableCount} Remaining
      </Caption3>
      <PrimaryButton
        className="my-2 uppercase"
        href={`?action=share-invite&inviteId=${availableId}`}
      >
        Share Wisely
      </PrimaryButton>
    </div>
  );
}
