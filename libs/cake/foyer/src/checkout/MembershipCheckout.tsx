import { currentUser } from "@clerk/nextjs";
import { Invitation } from "@danklabs/cake/db";
import { Checkout } from "@danklabs/cake/payments";
import { CartCookie } from "../cookie";
import { cookies } from "next/headers";

const CAKE_MEMBERSHIP_PRICE_ID = "price_1OMByvFp1nXP3WhKTbP8y1CW";

export async function MembershipCheckout({
  invitation,
}: {
  invitation: Invitation;
}) {
  const user = await currentUser();

  const cookieStore = cookies();
  if (!cookieStore.has("invitation-cart")) {
    throw new Error("cart not available");
  }

  const cartCookie = cookieStore.get("invitation-cart");
  let cart: CartCookie = JSON.parse(cartCookie!.value);
  if (!invitation) {
    throw new Error("no invitation");
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
    <Checkout
      priceId={CAKE_MEMBERSHIP_PRICE_ID}
      userId={user?.id}
      userEmailAddress={user?.emailAddresses[0].emailAddress}
      metadata={subscriptionMetadata}
    />
  );
}
