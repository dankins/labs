import {
  Member,
  db,
  invitations,
  members,
  Invitation,
} from "@danklabs/cake/db";
import { and, sql, eq, desc, isNull, count, max } from "drizzle-orm";

export async function getMemberInvitations(iam: string) {
  console.log("getMemberInvitations", iam);
  return db
    .select({
      status: sql<"UNUSED" | "PENDING" | "EXPIRED" | "ACCEPTED">`case 
          when ${invitations.redemptions} = ${invitations.maxRedemptions} then 'ACCEPTED'
          when ${invitations.code} is null then 'UNUSED'
          when ${invitations.expiration} < NOW() THEN 'EXPIRED'
         else 'PENDING' end as unused_pending`,
      id: sql<string>`max(${invitations.id}::text)`,
      recipientName: max(invitations.recipientName),
      code: invitations.code,
      expiration: max(invitations.expiration),
      count: count(),
    })
    .from(invitations)
    .innerJoin(
      members,
      and(eq(members.id, invitations.memberId), eq(members.iam, iam))
    )
    .groupBy(
      sql<string>`"unused_pending"`,
      invitations.code,
      invitations.expiration
    )
    .orderBy(desc(sql<string>`"unused_pending"`), invitations.expiration);
}
