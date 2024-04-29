import {
  Currency,
  Heading4,
  OfferCard,
  SectionHeading,
  WalletCard,
} from "@danklabs/cake/pattern-library/core";
import { Brand, brands } from "@danklabs/cake/services/admin-service";
import { Caption3 } from "@danklabs/pattern-library/core";

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
      <div className="flex flex-col gap-4 items-start">
        {brand.db.offerTemplates?.map((template) => (
          <OfferTemplate key={template.id} offerTemplate={template} />
        ))}
      </div>
    </>
  );
}

function OfferTemplate({
  offerTemplate,
}: {
  offerTemplate: NonNullable<Brand["db"]["offerTemplates"]>[0];
}) {
  if (
    offerTemplate.offerType === "voucher" &&
    offerTemplate.applyOnPassCreation
  ) {
    return (
      <OfferCard
        name={offerTemplate.name!}
        amount={parseInt(offerTemplate.offerValue)}
      />
    );
  }
}

// function BenefitCard({
//   amount,
//   name,
// }: {
//   amount?: string;
//   name?: string | null;
// }) {
//   return (
//     <div className="rounded-lg bg-[#292725] max-w-[300px] border border-[#686664] text-white rounded-md aspect-wallet flex flex-col justify-center items-center gap-6">
//       {amount ? (
//         <Currency amount={parseInt(amount)} size={"5xl"} />
//       ) : (
//         <span className="text-5xl">-</span>
//       )}
//       <Caption3 className="uppercase">{name || "Cake Card"}</Caption3>
//     </div>
//   );
// }

export function MemberBenefitsLoading() {
  return (
    <>
      <SectionHeading>Cake Member Benefits</SectionHeading>
      <div className="rounded-md w-full max-w-[300px] min-h-32 flex flex-col gap-4 items-center justify-center"></div>
    </>
  );
}
