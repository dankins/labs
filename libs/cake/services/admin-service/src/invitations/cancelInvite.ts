import {
  Member,
  db,
  invitations,
  members,
  Invitation,
} from "@danklabs/cake/db";
import { and, sql, eq, desc, isNull, count } from "drizzle-orm";

export async function cancelInvite(id: string) {
  console.log("cancel invite", id);
  return db
    .update(invitations)
    .set({
      updatedAt: new Date(),
      code: null,
      expiration: null,
    })
    .where(eq(invitations.id, id));
}
