export type MemberCollectionItem = {
  slug: string;
  value: number;
};
export type MemberCollection = {
  brandSlugs: string[];
  value: number;
  count: number;
  remaining: number;
  itemMap: { [key: string]: MemberCollectionItem };
};
export type Member = {
  id: string;
  iam: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  isSuperAdmin: boolean;
  isBrandManager: boolean;
  membershipStatus: "active" | "expired" | undefined;
  stripeCustomerId?: string;
  collection: MemberCollection;
};
