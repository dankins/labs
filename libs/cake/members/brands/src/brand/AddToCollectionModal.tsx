import { auth } from "@clerk/nextjs/server";

import { Currency } from "@danklabs/cake/pattern-library/core";
import {
  ActionButton,
  Heading3,
  Heading4,
  Modal,
  Paragraph2,
  PrimaryButton,
  SecondaryButton,
} from "@danklabs/pattern-library/core";
import { claimPassAction } from "./actions";
import { AddToCollectionButton } from "./AddToCollectionButton";
import { brands } from "@danklabs/cake/services/admin-service";

export async function AddToCollectionModal({ slug }: { slug: string }) {
  const { userId: iam } = auth().protect();
  const brand = await brands.getBrand(slug);
  const cakeCard = brand.db.offerTemplates.find(
    (ot) => ot.applyOnPassCreation && ot.offerType === "voucher"
  )?.offerValue;

  if (!cakeCard) {
    return (
      <Modal returnHref="">
        <div className="max-w-[320px] mt-[42px] p-6 flex flex-col text-center items-center justify-center gap-[24px]">
          <div>
            <span className="text-[32px] font-apris font-normal text-dark">
              Tasteful.
            </span>
            <p className="text-[16px] font-apris font-light text-dark">
              Add {brand.cms.name} to your collection to unlock exclusive brand
              perks.
            </p>
          </div>
          <div className="mt-[16px pt-[16px] flex flex-row gap-4 border-t border-t-[#EAE9E9]">
            <SecondaryButton href={`?brand=${slug}`} className="">
              No, thanks
            </SecondaryButton>
            <AddToCollectionButton
              action={claimPassAction.bind(undefined, iam, slug)}
            />
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal returnHref="">
      <div className="max-w-[320px] mt-[42px] p-6 flex flex-col text-center items-center justify-center gap-[24px]">
        <div className="flex flex-col ">
          <span className={`text-[82px] font-selva font-light leading-[82px]`}>
            <sup className="text-[41px]">$</sup>
            {cakeCard}
          </span>
          <Heading4 className="text-secondary uppercase">cake card</Heading4>
        </div>
        <div>
          <span className="text-[32px] font-apris font-normal text-dark">
            Tasteful.
          </span>
          <p className="text-[16px] font-apris font-light text-dark">
            Add {brand.cms.name} to your collection to receive a ${cakeCard}{" "}
            CAKE card and unlock exclusive brand perks.
          </p>
        </div>
        <div className="mt-[16px pt-[16px] flex flex-row gap-4 border-t border-t-[#EAE9E9]">
          <SecondaryButton href={`?brand=${slug}`} className="">
            No, thanks
          </SecondaryButton>
          <AddToCollectionButton
            action={claimPassAction.bind(undefined, iam, slug)}
          />
        </div>
      </div>
    </Modal>
  );
}
