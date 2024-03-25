import { currentUser } from "@clerk/nextjs";
import { Invitation } from "@danklabs/cake/db";
import { Checkout } from "@danklabs/cake/payments";
import { getCartIfAvailable } from "../cookie";

const CAKE_MEMBERSHIP_PRICE_ID = "price_1OpYe1HnJcBv7Ja0NG0dr9p5";

export async function MembershipCheckout({
  invitation,
}: {
  invitation: Invitation;
}) {
  const user = await currentUser();

  const cart = getCartIfAvailable();

  if (!cart) {
    throw new Error("cart not available");
  }

  if (user?.privateMetadata["membershipStatus"] === "active") {
    return <div>You already have an active membership!</div>;
  }

  const subscriptionMetadata = {
    invitationId: invitation.id,
    userId: user?.id,
    brandSelection: cart.selectedBrands.join(","),
  };

  return (
    <div className="max-w-[500px]">
      <Checkout
        priceId={CAKE_MEMBERSHIP_PRICE_ID}
        userId={user?.id}
        userEmailAddress={user?.emailAddresses[0].emailAddress}
        metadata={subscriptionMetadata}
      />
    </div>
  );
}
