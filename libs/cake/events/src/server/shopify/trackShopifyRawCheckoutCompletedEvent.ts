import { track, trackSystem } from "../serverTracking";
import { TrackShopifyRawCheckoutCompletedEvent } from "../tracking_plan";

export async function trackShopifyRawCheckoutCompletedEvent(
  brandSlug: string,
  payload: any
) {
  const event: TrackShopifyRawCheckoutCompletedEvent = {
    name: "Shopify Raw Checkout Complete Event",
    brand: brandSlug,
    payload,
  };

  return trackSystem(event);
}
