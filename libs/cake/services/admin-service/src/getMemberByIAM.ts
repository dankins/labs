import { db, members, passports } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";

export async function getMemberByIAM(
  iam: string,
  include?: { passport?: true | undefined }
) {
  return db.query.members.findFirst({
    where: eq(members.iam, iam),
    with: {
      passport: {
        with: {
          passes: {
            with: {
              brand: true,
            },
          },
        },
      },
    },
  });
}
