import {
  Currency,
  SectionHeading,
  WalletCard,
} from "@danklabs/cake/pattern-library/core";

export function MemberBenefits() {
  return (
    <>
      <SectionHeading>Cake Member Benefits</SectionHeading>
      <p className="text-base font-normal">
        Something about the benefits and some other content etc..
      </p>
      <div className="rounded-md w-full max-w-[300px] min-h-32 flex flex-col gap-4 items-center justify-center">
        <BenefitCard amount={100} />
      </div>
    </>
  );
}

function BenefitCard({ amount }: { amount?: number }) {
  return (
    <WalletCard
      content={
        <div className="h-full flex flex-col justify-center items-center font-pizzaz gap-4">
          {amount ? (
            <Currency amount={100} size={"5xl"} />
          ) : (
            <span className="text-5xl">-</span>
          )}
          <div className="text-xs text-black font-semibold uppercase">
            cake card
          </div>
        </div>
      }
    />
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
              <div className="text-xs text-black font-semibold uppercase">
                cake card
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}
