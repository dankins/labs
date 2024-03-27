export type SubscriptionReturnType = {
  subscriptionId: string;
  invoiceStatus: "paid" | "draft" | "open" | "uncollectible" | "void" | null;
  total: number;
  total_discount_amounts: { discount: string; amount: number }[] | null;
  total_excluding_tax: number;
  total_tax_amounts: number[];
  clientSecret: string | null;
};
