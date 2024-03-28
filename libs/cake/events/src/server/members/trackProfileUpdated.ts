import { track } from "../serverTracking";
import { Profile, TrackProfileUpdated } from "../tracking_plan";

export function trackProfileUpdated(userId: string, profile: Partial<Profile>) {
  const event: TrackProfileUpdated = {
    name: "Profile Updated",
    profile,
  };
  return track(userId, event);
}
