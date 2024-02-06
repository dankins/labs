"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

import {
  assignInvite,
  cancelInvite,
} from "@danklabs/cake/services/admin-service";
import { validateFormData } from "@danklabs/utils";

export async function cancelInviteAction(id: string) {
  await cancelInvite(id);
  revalidatePath("/account");
}

export async function assignInviteAction(
  inviteId: string,
  formData: FormData
): ReturnType<typeof assignInvite> {
  console.log("createInviteAction", inviteId, formData);
  const data = validateFormData(
    formData,
    z.object({
      name: z.string(),
    })
  );

  const invite = await assignInvite(inviteId, data.name);
  revalidatePath("/account");
  return invite;
}
