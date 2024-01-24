import { db, members, passports } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { createMemberPassport } from "./createMemberPassport";

export async function getMemberByIAM(
  iam: string,
  include?: { passport?: true | undefined }
) {
  const result = await db.query.members.findFirst({
    where: eq(members.iam, iam),
    with: {
      passport: {
        with: {
          passes: {
            with: {
              brand: true,
              offers: {
                with: {
                  template: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (result && !result.passport) {
    console.log("found member IAM but there is no passport");
    await createMemberPassport(result.id);
    return getMemberByIAM(iam, include);
  }

  return result;
}
