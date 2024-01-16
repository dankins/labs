"use server";

import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

import { db, invitations } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function activateInvitationAction(id: string): Promise<void> {
  const invitation = await db.query.invitations.findFirst({
    where: eq(invitations.id, id),
  });
  if (!invitation) {
    throw new Error("not found");
  }

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

  const code = `${adverb}-${adjective}-${noun}`;
  const expiration = dayjs().add(7, "day").toDate();

  await db
    .update(invitations)
    .set({ code, expiration })
    .where(eq(invitations.id, id));

  revalidatePath("/members/invitations");
}
