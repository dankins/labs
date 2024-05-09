import { Checkout, getCart } from "@danklabs/cake/payments";
import { stripe } from "@danklabs/cake/services/admin-service";
import { FoyerContainer } from "../FoyerContainer";
import { invitations } from "@danklabs/cake/services/admin-service";

const CAKE_MEMBERSHIP_PRICE_ID = process.env["CAKE_MEMBERSHIP_PRICE_ID"]!;

export async function MembershipCheckout({
  invitation,
  searchParams,
}: {
  invitation: NonNullable<
    Awaited<ReturnType<typeof invitations.getInvitation.cached>>
  >;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let cart = getCart();
  if (!cart) {
    throw new Error("invalid state");
  }
  const customerId = await stripe.payments.getOrCreateCustomer(cart.id);
  const subscriptionMetadata = {
    invitationId: invitation.id,
  };

  const coupon = invitation.coupon || invitation.campaign?.coupon || undefined;

  return (
    <FoyerContainer displayLogo={true} checkoutShortcut={false}>
      <div className="mt-[20px] w-full max-w-[500px]">
        <Checkout
          searchParams={searchParams}
          priceId={CAKE_MEMBERSHIP_PRICE_ID}
          stripeCustomerId={customerId}
          metadata={subscriptionMetadata}
          couponId={coupon}
          returnUrl="/invitation?step=account"
        />
      </div>
    </FoyerContainer>
  );
}

export function CreatingStripeCustomer() {}
