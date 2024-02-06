import {
  Member,
  db,
  invitations,
  members,
  Invitation,
} from "@danklabs/cake/db";
import { and, sql, eq, desc, isNull, count } from "drizzle-orm";
import { PgTimestamp } from "drizzle-orm/pg-core";

export async function getMemberInvitation(iam: string) {
  return db
    .select({
      status: sql<
        "UNUSED" | "PENDING"
      >`case when ${invitations.code} is null then 'UNUSED' else 'PENDING' end as unused_pending`,
      count: count(),
    })
    .from(invitations)
    .innerJoin(
      members,
      and(eq(members.id, invitations.memberId), eq(members.iam, iam))
    )
    .groupBy(sql<string>`"unused_pending"`)
    .orderBy(desc(sql<string>`"unused_pending"`));
}
