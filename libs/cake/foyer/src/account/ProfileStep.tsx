import {
  Heading1,
  Heading4,
  Paragraph,
  PrimaryButton,
  Text,
} from "@danklabs/pattern-library/core";
import { FoyerContainer } from "../FoyerContainer";
import { AvatarPicker, SelectUsername } from "@danklabs/cake/members/community";

export async function ProfileStep() {
  return (
    <FoyerContainer>
      <Heading4>Create your profile</Heading4>
      <Text>
        Choose your username and upload a photo to create and reserve your
        profile.
      </Text>
      <SelectUsername />
      {/* <AvatarPicker /> */}

      <PrimaryButton href={`/invitation?step=contact`}>Next</PrimaryButton>
    </FoyerContainer>
  );
}
