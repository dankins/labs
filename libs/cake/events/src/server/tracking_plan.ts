export type ServerTrackingEvent =
  | TrackInvitationCodeSubmittedEvent
  | TrackInvitationEmailSubmittedEvent
  | TrackInvitationAccountCompleted
  | TrackInvitationCheckoutCompleted
  | TrackBrandAddedToCollection
  | TrackProfileUpdated
  | TrackCheckoutComplete
  | TrackSendInvitationEmailInviter
  | TrackSendInvitationEmailRecipient
  | TrackInvitationActivated
  | TrackShopifyRawCheckoutCompletedEvent;

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
  email: string;
};

export type TrackBrandAddedToCollection = {
  name: "Brand Added To Collection";
  brand: string;
  collection: string[];
};

export type TrackShopifyRawCheckoutCompletedEvent = {
  name: "Shopify Raw Checkout Complete Event";
  brand: string;
  payload: any;
};

export type Profile = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
};
export type TrackProfileUpdated = {
  name: "Profile Updated";
  profile: Profile;
};

export type TrackCheckoutComplete = {
  email: string;
  name: "Checkout Complete";
  invitationId?: string;
  inviterFirstName?: string;
  renewalDate?: string;
};

export type TrackInvitationActivated = {
  email: string;
  name: "Invitation Activated";
  invitationId: string;
  inviteUrl: string;
  inviteCode: string;
  expirationDate: string;
  recipientName: string;
};

export type TrackSendInvitationEmailInviter = {
  email: string;
  name: "Send Invitation Email Inviter";
  invitationId: string;
  inviterMessage: string | null | undefined;
  inviteUrl: string;
  inviteCode: string;
  expirationDate: string;
  recipientEmail: string;
  recipientName: string;
};

export type TrackSendInvitationEmailRecipient = {
  email: string;
  name: "Send Invitation Email Recipient";
  invitationId: string;
  inviterFirstName: string | null;
  inviterMessage: string | null | undefined;
  inviterBrands: string[];
  inviteUrl: string;
  inviteCode: string;
  expirationDate: string;
  recipientName: string;
};
