import {
  Heading1,
  PrimaryButton,
  TextInput,
} from "@danklabs/pattern-library/core";
import { addBrandAction } from "../actions";

export async function AddBrand() {
  return (
    <div className="p-6">
      <Heading1 className="text-xl">Add Brand</Heading1>
      <form action={addBrandAction} className="py-5">
        <TextInput name="slug" label="Slug" placeholder="URL slug" />
        <PrimaryButton type="submit" className="my-5">
          Save
        </PrimaryButton>
      </form>
    </div>
  );
}
