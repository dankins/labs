import {
  Member,
  db,
  invitations,
  members,
  Invitation,
} from "@danklabs/cake/db";
import { and, sql, eq, desc, isNull, count, max } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";

async function getMemberInvitations_nocache(iam: string) {
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
      return member.invitations;
    });
}

export const getMemberInvitations = {
  cached(iam: string) {
    const fn = unstable_cache(
      getMemberInvitations_nocache,
      [`get-member-invitations-${iam}`],
      {
        tags: [`get-member-invitations-${iam}`],
      }
    );

    return fn(iam);
  },
  clearCache(iam: string) {
    revalidateTag(`get-member-invitations-${iam}`);
  },
};
