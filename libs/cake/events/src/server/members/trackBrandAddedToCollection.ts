import { track } from "../serverTracking";
import { TrackBrandAddedToCollection } from "../tracking_plan";

export function trackBrandAddedToCollection(
  userId: string,
  brandSlug: string,
  collection: string[]
) {
  const event: TrackBrandAddedToCollection = {
    name: "Brand Added To Collection",
    brand: brandSlug,
    collection,
  };
  track(userId, event);
  console.log("trackBrandAddedToCollection", userId, brandSlug, collection);
}
