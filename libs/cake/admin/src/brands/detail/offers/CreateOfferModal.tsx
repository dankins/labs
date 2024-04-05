import {
  Checkbox,
  FormAction,
  FormState,
  Heading1,
  InterceptModal,
  NumericInput,
  TextInput,
} from "@danklabs/pattern-library/core";
import { createOfferAction } from "./actions";

export async function CreateOfferModal({
  slug,
  searchParams,
}: {
  slug: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <InterceptModal returnHref={`/admin/${slug}/offers`}>
      <FormAction
        action={createOfferAction.bind(undefined, slug)}
        cta={"Create Offer"}
        className="p-4 flex flex-col gap-3"
      >
        <Heading1 className="text-2xl">Create Offer</Heading1>
        <TextInput name="name" label="Offer Name" required />
        <TextInput name="description" label="Description" required />
        <NumericInput name="offerValue" label="Value" min={1} required />
        <Checkbox
          name="applyOnPassCreation"
          label="Grant this offer to all members who add this brand to their collection"
          defaultChecked
        />
      </FormAction>
    </InterceptModal>
  );
}
