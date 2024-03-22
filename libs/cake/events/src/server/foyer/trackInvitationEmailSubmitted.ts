import { trackAnon, getAnonymousId, identifyAnon } from "../serverTracking";
import { TrackInvitationEmailSubmittedEvent } from "../tracking_plan";

export async function trackInvitationEmailSubmitted(email: string) {
  const aId = getAnonymousId();
  const event: TrackInvitationEmailSubmittedEvent = {
    name: "Invitation Email Submitted",
    email,
  };
  identifyAnon(email, {});
  console.log("trackInvitationEmailSubmitted", email, aId);
  return trackAnon(event);
}
