import { db, invitations as invitationsTable } from "@danklabs/cake/db";
import { invitations } from "@danklabs/cake/services/admin-service";
import { eq } from "drizzle-orm";
import { getInvitation } from "./getInvitation";

export async function cancelInvite(iam: string, id: string) {
  const invitation = await getInvitation.cached(id);
  if (!invitation) {
    throw new Error("invitation not found");
  }
  console.log("cancel invite", id);
  await db
    .update(invitationsTable)
    .set({
      updatedAt: new Date(),
      code: null,
      expiration: null,
    })
    .where(eq(invitationsTable.id, id));

  invitations.getInvitation.clearCache(id);
  invitations.getMemberInvitations.clearCache(iam);
}
