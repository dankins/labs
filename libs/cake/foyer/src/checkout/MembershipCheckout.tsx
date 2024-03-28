import { auth } from "@clerk/nextjs";
import { Invitation } from "@danklabs/cake/db";
import { Checkout } from "@danklabs/cake/payments";
import { getCartIfAvailable } from "../cookie";
import { members, stripe } from "@danklabs/cake/services/admin-service";

const CAKE_MEMBERSHIP_PRICE_ID = process.env["CAKE_MEMBERSHIP_PRICE_ID"]!;

export async function MembershipCheckout({
  invitation,
}: {
  invitation: Invitation;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("not authenticated");
  }
  const user = await members.member.get(userId);

  const cart = getCartIfAvailable();

  if (!cart) {
    throw new Error("cart not available");
  }

  if (user.membershipStatus === "active") {
    return <div>You already have an active membership!</div>;
  }

  const subscriptionMetadata = {
    invitationId: invitation.id,
    userId: userId,
  };

  let stripeCustomerId = user.stripeCustomerId;
  if (!stripeCustomerId) {
    stripeCustomerId = await stripe.payments.createCustomer(
      userId,
      invitation.id
    );
  }

  if (!stripeCustomerId) {
    throw new Error("invalid state");
  }

  return (
    <div className="max-w-[500px]">
      <Checkout
        cartId={cart.id}
        priceId={CAKE_MEMBERSHIP_PRICE_ID}
        stripeCustomerId={stripeCustomerId}
        metadata={subscriptionMetadata}
        couponId={invitation.coupon ? invitation.coupon : undefined}
      />
    </div>
  );
}

export function CreatingStripeCustomer() {}
