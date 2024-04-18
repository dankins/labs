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
      </div>
      <div className="w-full max-w-[300px] min-h-32 flex flex-col gap-4 items-center justify-center">
        {brand.db.offerTemplates.map((template) => (
          <OfferTemplate key={template.id} offerTemplate={template} />
        ))}
      </div>
    </>
  );
}

function OfferTemplate({
  offerTemplate,
}: {
  offerTemplate: Brand["db"]["offerTemplates"][0];
}) {
  if (
    offerTemplate.offerType === "voucher" &&
    offerTemplate.applyOnPassCreation
  ) {
    return (
      <BenefitCard
        amount={offerTemplate.offerValue}
        name={offerTemplate.name}
      />
    );
  }
}

function BenefitCard({
  amount,
  name,
}: {
  amount?: string;
  name?: string | null;
}) {
  return (
    <div className="bg-[#292725] text-white rounded-md aspect-wallet h-[180px] ">
      <div className=" rounded-lg h-full flex flex-col justify-center items-center font-pizzaz gap-6">
        {amount ? (
          <Currency amount={parseInt(amount)} size={"5xl"} />
        ) : (
          <span className="text-5xl">-</span>
        )}
        <Caption3 className="uppercase">{name || "Cake Card"}</Caption3>
      </div>
    </div>
  );
}

export function MemberBenefitsLoading() {
  return (
    <>
      <SectionHeading>Cake Member Benefits</SectionHeading>
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
