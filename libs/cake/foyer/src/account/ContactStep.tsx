import {
  Checkbox,
  FormAction,
  Heading1,
  Heading3,
  TextInput,
  Text,
  TextArea,
  PhoneIcon,
  SecondaryButton,
} from "@danklabs/pattern-library/core";
import { FoyerContainer } from "../FoyerContainer";
import { updatePhoneAction } from "../actions";
import {} from "sanity";

export async function ContactStep() {
  return (
    <FoyerContainer>
      <Heading3>Timely Updates</Heading3>
      <Text>
        Let us know your mobile number so that you’re always the first to hear
        the exciting news.
      </Text>

      <FormAction
        action={updatePhoneAction}
        cta={"Next"}
        className="mt-8 w-full flex flex-col gap-2"
      >
        <TextInput
          icon={<PhoneIcon />}
          name="phone"
          label="Mobile Phone Number"
          placeholder="Mobile Phone Number"
          required
        />
        <Checkbox
          name="consent"
          label="Keep me up to date"
          placeholder="Address 2"
          helperText
          defaultChecked
        />
        <div className="mb-4"></div>
      </FormAction>
      <SecondaryButton href={`/collection`}>Maybe Later </SecondaryButton>
    </FoyerContainer>
  );
}
