import { StringDefinition } from "sanity";
import { track } from "../serverTracking";
import { TrackCheckoutComplete } from "../tracking_plan";

export function trackCheckoutComplete(
  iam: string,
  event: Omit<TrackCheckoutComplete, "name">
) {
  const eventFull: TrackCheckoutComplete = {
    name: "Checkout Complete",
    ...event,
  };
  return track(iam, eventFull);
}
