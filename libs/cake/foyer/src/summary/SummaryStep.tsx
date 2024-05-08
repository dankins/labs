import { Heading1, PrimaryButton } from "@danklabs/pattern-library/core";
import { FoyerContainer } from "../FoyerContainer";

export async function SummaryStep() {
  return (
    <FoyerContainer>
      <Heading1>Summary</Heading1>

      <p>Membership Term</p>
      <p>Benefits summary</p>
      <p>price / year</p>
      <p>Invite expires in 72 hours</p>
      <PrimaryButton href={`/invitation?step=checkout`}>Checkout</PrimaryButton>
    </FoyerContainer>
  );
}
