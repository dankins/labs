import { trackAnon, getAnonymousId } from "../serverTracking";
import { TrackInvitationCodeSubmittedEvent } from "../tracking_plan";

export async function trackInvitationCodeSubmitted(code: string) {
  const aId = getAnonymousId();
  const event: TrackInvitationCodeSubmittedEvent = {
    name: "Invitation Code Submitted",
    code,
  };
  console.log("trackInvitationCodeSubmitted", code, aId);
  return trackAnon(event);
}
