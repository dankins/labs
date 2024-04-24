export type MemberCollectionItemOffer = {
  name?: string;
  offerType: "voucher";
  offerValue: number;
  status: "new" | "redeemed" | "archived";
  redemptionDate?: Date;
  code?: string;
};
export type MemberCollectionItem = {
  slug: string;
  value: number;
  offers: MemberCollectionItemOffer[];
};
export type MemberCollection = {
  brandSlugs: string[];
  value: number;
  count: number;
  remaining: number;
  maxCollectionItems: number;
  itemMap: { [key: string]: MemberCollectionItem };
};
export type Member = {
  id: string;
  iam: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  invitationId?: string;
  isSuperAdmin: boolean;
  isBrandManager: boolean;
  membershipStatus: "active" | "expired" | undefined;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  collection: MemberCollection;
  favorites: string[];
};
