import {
  Member,
  db,
  invitations,
  members,
  Invitation,
} from "@danklabs/cake/db";
import { and, sql, eq, desc, isNull, count, max } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";

async function fn(iam: string) {
  console.log("getMemberInvitations", iam);
  return db.query.members
    .findFirst({
      where: eq(members.iam, iam),
      with: {
        invitations: {
          orderBy: desc(invitations.expiration),
          extras: {
            status: sql<"UNUSED" | "PENDING" | "EXPIRED" | "ACCEPTED">`
            case
                     when ${invitations.redemptions} = ${invitations.maxRedemptions} then 'ACCEPTED'
                     when ${invitations.code} is null then 'UNUSED'
                     when ${invitations.expiration} < NOW() THEN 'EXPIRED'
                    else 'PENDING' 
            end
          `.as("status"),
          },
        },
      },
    })
    .then((member) => {
      if (!member) {
        throw new Error("member not found");
      }
      console.log("result", member);
      return member.invitations;
    });
}

function tag(iam: string) {
  return `member-invitations-${iam}`;
}

export async function getInvitations(iam: string) {
  return unstable_cache(fn, [tag(iam)], {
    tags: [tag(iam)],
  })(iam);
}

export async function clearInvitationsCache(iam: string) {
  revalidateTag(tag(iam));
}
