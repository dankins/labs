import { auth } from "@clerk/nextjs/server";
import { Checkout } from "@danklabs/cake/payments";
import { members, stripe } from "@danklabs/cake/services/admin-service";
import { DEFAULT_MAX_COLLECTION_ITEMS } from "libs/cake/services/admin-service/src/members/member/create";
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
  const { userId } = auth().protect();
  const user = await members.member.getOrCreateByIAM(userId, {
    invitationId: invitation.id,
    maxCollectionItems:
      invitation.collectionItemsGranted ||
      invitation.collectionItemsGranted ||
      DEFAULT_MAX_COLLECTION_ITEMS,
  });

  if (user.membershipStatus === "active" && !searchParams["redirect_status"]) {
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

  const coupon = invitation.coupon || invitation.campaign?.coupon || undefined;

  return (
    <FoyerContainer>
      <div className="mt-[20px] w-full max-w-[500px]">
        <Checkout
          searchParams={searchParams}
          priceId={CAKE_MEMBERSHIP_PRICE_ID}
          stripeCustomerId={stripeCustomerId}
          metadata={subscriptionMetadata}
          couponId={coupon}
        />
      </div>
    </FoyerContainer>
  );
}

export function CreatingStripeCustomer() {}
