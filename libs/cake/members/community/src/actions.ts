"use server";
import { auth } from "@clerk/nextjs/server";
import { members } from "@danklabs/cake/services/admin-service";
import { FormState } from "@danklabs/pattern-library/core";
import { validateFormData } from "@danklabs/utils";
import { z } from "zod";

export async function updateUsernameAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { userId } = auth();
  if (!userId) {
    return { status: "error", message: "not implemented" };
  }
  const data = validateFormData(
    formData,
    z.object({
      username: z.string().min(3).max(20),
    })
  );

  console.log("request username", data.username);
  try {
    await members.community.updateUsername(userId, data.username);
  } catch (err) {
    console.error("inside actions.ts", err);
    return { status: "error", message: "error updating username" };
  }

  return { status: "success", message: "Username updated" };
}

export async function addConnectionAction(
  username: string
): Promise<FormState> {
  const { userId: iam } = auth().protect();
  try {
    await members.community.addConnection(iam, username);
    return { status: "success", message: "Connection added" };
  } catch (err) {
    console.error("error adding connection", iam, username, err);
    return { status: "error", message: "error adding connection" };
  }
}

export async function removeConnectionAction(
  username: string
): Promise<FormState> {
  const { userId: iam } = auth().protect();
  try {
    await members.community.removeConnection(iam, username);
    return { status: "success", message: "Connection added" };
  } catch (err) {
    console.error("error removing connection", iam, username, err);
    return { status: "error", message: "error adding connection" };
  }
}

export async function updateAvatarAction(
  prevState: FormState,
  input: string
): Promise<FormState> {
  return { status: "error", message: "not implemented" };
}
