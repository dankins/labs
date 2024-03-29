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
  console.log("trackBrandAddedToCollection", userId, brandSlug, collection);
  return track(userId, event);
}
