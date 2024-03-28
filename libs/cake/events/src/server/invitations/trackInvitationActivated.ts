import { track } from "../serverTracking";
import { TrackInvitationActivated } from "../tracking_plan";

export async function trackInvitationActivated(
  iam: string,
  event: Omit<TrackInvitationActivated, "name">
) {
  console.log("TrackSendInvitationEmailInviter");
  return track(iam, { name: "Invitation Activated", ...event });
}
