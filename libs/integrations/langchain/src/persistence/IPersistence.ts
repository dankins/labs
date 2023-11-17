import { ChatHistory } from "../schemas";

export interface IPersistence {
  bootstrapHistory(chatId: string): Promise<ChatHistory>;
  loadChatHistory(chatId: string): Promise<ChatHistory>;
  saveMessage(
    chatId: string,
    sender: "ai" | "user" | "system",
    message: string
  ): Promise<string>;
}
