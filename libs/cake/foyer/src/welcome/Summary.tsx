import {
  ArrowDownIcon,
  CircleButton,
  Heading1,
  Heading3,
  PrimaryButton,
} from "@danklabs/pattern-library/core";

export function Summary() {
  return (
    <div>
      <Heading1>Summary</Heading1>

      <p>Membership Term</p>
      <p>Benefits summary</p>
      <p>price / year</p>
      <p>Invite expires in 72 hours</p>
      <PrimaryButton href={`/invitation?step=checkout`}>Checkout</PrimaryButton>
    </div>
  );
}
