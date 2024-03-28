import { db, members } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { clearCache } from "./clearCache";

export type Profile = {
  firstName?: string;
  lastName?: string;
  email: string;
};

export async function updateMembershipStatus(
  iam: string,
  subscriptionId: string,
  status: "active" | "expired"
) {
  await db
    .update(members)
    .set({
      stripeSubscriptionId: subscriptionId,
      membershipStatus: status,
      updatedAt: new Date(),
    })
    .where(eq(members.iam, iam));

  clearCache(iam);
}
