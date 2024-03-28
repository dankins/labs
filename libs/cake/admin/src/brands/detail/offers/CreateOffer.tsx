import { ActionButton } from "@danklabs/pattern-library/core";
import { createOffer } from "../../actions";

export async function CreateOffer({
  brandSlug,
  brandId,
}: {
  brandSlug: string;
  brandId: string;
}) {
  return (
    <div>
      <ActionButton action={createOffer.bind(undefined, brandSlug, brandId)}>
        Create Offer
      </ActionButton>
    </div>
  );
}
