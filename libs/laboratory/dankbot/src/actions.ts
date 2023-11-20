"use server";

import { revalidatePath } from "next/cache";
import { DankBot } from "./DankBot";

export async function refreshAction(chatId: string, latestId: string) {
  "use server";
  console.log("refresh me timbers", latestId);
  const latestHistory = await DankBot.loadChatHistory(chatId);
  if (
    latestHistory.messages.length > 1 &&
    latestHistory.messages[latestHistory.messages.length - 1].id !== latestId
  ) {
    revalidatePath("/");
  }
}

export async function sendMessageAction(chatId: string, formData: FormData) {
  "use server";

  const message = formData.get("message");
  if (message === null) {
    console.error("no message sent");
    return;
  }

  const result = await DankBot.sendMessage(chatId, message.toString());
  console.log("result", {
    message: message.toString(),
    result,
  });
  revalidatePath("/");
}
