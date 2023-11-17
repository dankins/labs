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
