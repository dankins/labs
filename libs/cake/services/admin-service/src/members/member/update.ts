import { db, members, passports } from "@danklabs/cake/db";
import { clearCache } from "./clearCache";
import { eq } from "drizzle-orm";

export async function update(
  iam: string,
  data: Partial<
    Omit<typeof members.$inferInsert, "iam" | "createdAt" | "updatedAt">
  >
) {
  const change: Partial<typeof members.$inferInsert> = {
    updatedAt: new Date(),
  };
  if (data.stripeCustomerId) {
    change.stripeCustomerId = data.stripeCustomerId;
  }
  if (data.maxCollectionItems) {
    change.maxCollectionItems = data.maxCollectionItems;
  }
  if (data.membershipStatus) {
    change.membershipStatus = data.membershipStatus;
  }
  if (data.stripeSubscriptionId) {
    change.stripeSubscriptionId = data.stripeSubscriptionId;
  }
  await db.update(members).set(change).where(eq(members.iam, iam)).execute();

  clearCache(iam);
}
