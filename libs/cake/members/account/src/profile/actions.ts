"use server";
import { auth, currentUser } from "@clerk/nextjs";
import { z } from "zod";

import { validateFormData } from "@danklabs/utils";
import { members } from "@danklabs/cake/services/admin-service";

export async function updateProfileAction(formData: FormData) {
  const { userId } = auth();
  const user = await currentUser();
  if (!userId) {
    throw new Error("userId unavailable");
  }
  const data = validateFormData(
    formData,
    z.object({
      firstName: z.string(),
      lastName: z.string(),
      phone: z.string().optional(),
      email: z.string().optional(),
    })
  );

  data.email = user?.emailAddresses[0].emailAddress!;

  await members.member.updateProfile(userId, data);
}
