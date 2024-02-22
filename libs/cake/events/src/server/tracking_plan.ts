export type ServerTrackingEvent =
  | TrackInvitationCodeSubmittedEvent
  | TrackInvitationEmailSubmittedEvent
  | TrackInvitationAccountCompleted
  | TrackInvitationCheckoutCompleted;

export type TrackInvitationCodeSubmittedEvent = {
  name: "Invitation Code Submitted";
  code: string;
};

export type TrackInvitationEmailSubmittedEvent = {
  name: "Invitation Email Submitted";
  email: string;
};

export type TrackInvitationAccountCompleted = {
  name: "Invitation Account Completed";
  email: string;
  firstName: string;
  lastName: string;
};

export type TrackInvitationCheckoutCompleted = {
  name: "Invitation Checkout Completed";
  subscriptionId: string;
};
