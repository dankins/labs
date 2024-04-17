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

export async function AddToCollectionModal({ slug }: { slug: string }) {
  const { userId: iam } = auth().protect();
  return (
    <Modal returnHref="">
      <div className="mt-[42px] p-6 flex flex-col text-center items-center justify-center ga">
        <div>
          <Currency amount={200} size="5xl" className="" />
          <div>Collection value</div>
          <Heading3>Tasteful addition.</Heading3>
          <Paragraph2>
            Add Johanna Ortiz to your collection to receive a $200 CAKE card.
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
