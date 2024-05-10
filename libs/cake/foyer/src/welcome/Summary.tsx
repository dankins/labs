import {
  ArrowDownIcon,
  CircleButton,
  Heading1,
  Heading3,
  Heading4,
  PrimaryButton,
  Text,
} from "@danklabs/pattern-library/core";

export function Summary() {
  return (
    <div className="flex flex-col gap-6">
      <Heading1 className="text-xl">You are invited to join CAKE.</Heading1>

      <div>
        <Heading4>Member Benefits</Heading4>
        <Text>
          CAKE membership makes you an insider with our brand partners
        </Text>
      </div>
      <div>
        <Heading4>Special Shopping</Heading4>
        <Text>
          Select 10 CAKE Cards from our brand partners. Each CAKE Card is an
          exclusive monetary offer that can be applied to purchases at that
          brand’s site or store. Available as soon as you join.
        </Text>
        <br />
        <Text weight="bold">View brand partners and CAKE Cards</Text>
      </div>
      <div>
        <Heading4>Special Access</Heading4>
        <Text>
          CAKE brand partners provide special access and experiences to our
          members. Examples shopping a release early, attending invitation-only
          events, having the opportunity to shop limited merchandise, etc.
        </Text>
      </div>
      <div>
        <Heading4>Bonus Perks</Heading4>
        <Text>
          Throughout the year you will receive ad hoc bonus perks from our brand
          partners.
        </Text>
      </div>
      <PrimaryButton href={`/invitation?step=checkout`}>Checkout</PrimaryButton>
    </div>
  );
}
