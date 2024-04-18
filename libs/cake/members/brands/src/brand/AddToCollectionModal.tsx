import { auth } from "@clerk/nextjs/server";

import { Currency } from "@danklabs/cake/pattern-library/core";
import {
  ActionButton,
  Heading3,
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
  const cakeCards = brand.db.offerTemplates
    .filter((ot) => ot.applyOnPassCreation && ot.offerType === "voucher")
    .reduce((acc, ot) => acc + parseInt(ot.offerValue), 0);

  return (
    <Modal returnHref="">
      <div className="mt-[42px] p-6 flex flex-col text-center items-center justify-center gap-4">
        <div className="flex flex-col gap-4">
          <Currency amount={cakeCards} size="5xl" className="" />
          <div>Collection value</div>
          <Heading3>Tasteful addition.</Heading3>
          <Paragraph2>
            Add {brand.cms.name} to your collection to receive a ${cakeCards}{" "}
            CAKE card.
          </Paragraph2>
        </div>
        <div className="mt-[42px] flex flex-row gap-4">
          <SecondaryButton href={`?brand=${slug}`} className="">
            Cancel
          </SecondaryButton>
          <AddToCollectionButton
            action={claimPassAction.bind(undefined, iam, slug)}
          />
        </div>
      </div>
    </Modal>
  );
}
