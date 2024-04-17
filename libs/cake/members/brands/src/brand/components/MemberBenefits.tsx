import {
  Currency,
  Heading4,
  SectionHeading,
  WalletCard,
} from "@danklabs/cake/pattern-library/core";
import { Brand, brands } from "@danklabs/cake/services/admin-service";
import {
  Caption3,
  CollectionIcon,
  SecondaryButton,
} from "@danklabs/pattern-library/core";

export function MemberBenefits({
  brand,
  member,
}: {
  brand: Brand;
  member: any;
}) {
  return (
    <>
      <div className="flex flex-row items-center">
        <Heading4 className="grow">Cake Member Benefits</Heading4>
        <SecondaryButton size="sm" icon={<CollectionIcon />}>
          <span className="hidden md:block">Add to Collection</span>
        </SecondaryButton>
      </div>
      <div className="w-full max-w-[300px] min-h-32 flex flex-col gap-4 items-center justify-center">
        <BenefitCard amount={100} />
      </div>
    </>
  );
}

function BenefitCard({ amount }: { amount?: number }) {
  return (
    <div className="bg-[#292725] text-white rounded-md aspect-wallet h-[180px] ">
      <div className=" rounded-lg h-full flex flex-col justify-center items-center font-pizzaz gap-4">
        {amount ? (
          <Currency amount={amount} size={"5xl"} />
        ) : (
          <span className="text-5xl">-</span>
        )}
        <Caption3 className="uppercase">cake card</Caption3>
      </div>
    </div>
  );
}

export function MemberBenefitsLoading() {
  return (
    <>
      <SectionHeading>Cake Member Benefits</SectionHeading>
      <p className="text-base font-normal">
        Something about the benefits and some other content etc..
      </p>
      <div className="rounded-md w-full max-w-[300px] min-h-32 flex flex-col gap-4 items-center justify-center">
        <WalletCard
          content={
            <div className="h-full flex flex-col justify-center items-center font-pizzaz gap-4">
              <BenefitCard />
              <div className="text-xs font-semibold uppercase">cake card</div>
            </div>
          }
        />
      </div>
    </>
  );
}
