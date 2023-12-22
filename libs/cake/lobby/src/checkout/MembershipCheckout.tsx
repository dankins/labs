import { currentUser } from "@clerk/nextjs";
import { Invitation } from "@danklabs/cake/db";
import { Checkout } from "@danklabs/cake/payments";

const CAKE_MEMBERSHIP_PRICE_ID = "price_1OMByvFp1nXP3WhKTbP8y1CW";

export async function MembershipCheckout({
  invitation,
}: {
  invitation: Invitation;
}) {
  const user = await currentUser();

  if (!invitation) {
    throw new Error("no invitation");
  }

  if (user?.privateMetadata["membershipStatus"] === "active") {
    return <div>You already have an active membership!</div>;
  }

  const subscriptionMetadata = {
    invitationId: invitation.id,
    userId: user?.id,
  };

  return (
    <Checkout
      priceId={CAKE_MEMBERSHIP_PRICE_ID}
      userId={user?.id}
      userEmailAddress={user?.emailAddresses[0].emailAddress}
      metadata={subscriptionMetadata}
    />
  );
}
