import {
  FormAction,
  Heading1,
  Heading3,
  PrimaryButton,
  SecondaryButton,
  Text,
  TextInput,
} from "@danklabs/pattern-library/core";
import { FoyerContainer } from "../FoyerContainer";
import { updateAddressAction } from "../actions";

export async function AddressStep() {
  return (
    <FoyerContainer>
      <Heading3>Special Events and Gifts</Heading3>
      <Text>
        CAKE loves to treat our members with invites to special events and
        surprise gifts. Tell us where you live so that we can include you in the
        fun.
      </Text>
      <FormAction
        action={updateAddressAction}
        cta={"Next"}
        className="mt-4 w-full flex flex-col gap-2"
      >
        <TextInput
          name="address"
          label="Address"
          placeholder="Address"
          required
        />
        <TextInput name="address2" label="Address 2" placeholder="Address 2" />
        <TextInput name="city" label="City" placeholder="City" required />
        <TextInput name="state" label="State" placeholder="State" required />
        <TextInput
          name="postalCode"
          label="Postal Code"
          placeholder="Postal Code"
          required
        />
        <input type="hidden" name="countryCode" value="USA " />
        <TextInput
          name="countryCodeDisplay"
          label="Country"
          placeholder="Country"
          value="USA"
          disabled
          required
          helperText="Currently we are only serving the USA."
        />
      </FormAction>
      <SecondaryButton>Skip</SecondaryButton>
    </FoyerContainer>
  );
}
