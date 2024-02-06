import { Invitation, db, invitations } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

export async function assignInvite(
  inviteId: string,
  name: string
): Promise<{
  id: string;
  recipientName: string;
  code: string;
  expiration: Date;
}> {
  const adverb = faker.word.adverb({
    length: { min: 5, max: 10 },
    strategy: "longest",
  });
  const adjective = faker.word.adjective({
    length: { min: 5, max: 10 },
    strategy: "longest",
  });
  const noun = faker.word.noun({
    length: { min: 5, max: 10 },
    strategy: "longest",
  });

  const newCode = `${adverb}-${adjective}-${noun}`;
  const newExpiration = dayjs().add(7, "day").toDate();

  const result = await db
    .update(invitations)
    .set({
      code: newCode,
      expiration: newExpiration,
      recipientName: name,
      updatedAt: new Date(),
    })
    .where(eq(invitations.id, inviteId))
    .returning();

  if (result.length !== 1) {
    console.log("unable to update record", result, inviteId);
    throw new Error("unable to update record");
  }

  const { id, code, expiration, recipientName } = result[0];

  return {
    id,
    code: code!,
    expiration: expiration!,
    recipientName: recipientName!,
  };
}
