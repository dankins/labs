import { track, trackAnon } from "../serverTracking";
import {
  TrackSendInvitationEmailInviter,
  TrackSendInvitationEmailRecipient,
} from "../tracking_plan";

export async function trackSendInvitationEmailInviter(
  iam: string,
  event: Omit<TrackSendInvitationEmailInviter, "name">
) {
  console.log("TrackSendInvitationEmailInviter");
  return track(iam, { name: "Send Invitation Email Inviter", ...event });
}

export async function trackSendInvitationEmailRecipient(
  event: Omit<TrackSendInvitationEmailRecipient, "name">
) {
  console.log("TrackSendInvitationEmailRecipient");
  return trackAnon({ name: "Send Invitation Email Recipient", ...event });
}
