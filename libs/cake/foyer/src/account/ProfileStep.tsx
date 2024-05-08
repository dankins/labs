import { Heading1, PrimaryButton } from "@danklabs/pattern-library/core";
import { FoyerContainer } from "../FoyerContainer";

export async function ContactStep() {
  return (
    <FoyerContainer>
      <Heading1>Profile</Heading1>

      <PrimaryButton href={`/invitation?step=contact`}>Next</PrimaryButton>
    </FoyerContainer>
  );
}
