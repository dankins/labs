import { z } from "zod";

export const ChatMessageSchema = z.object({
  id: z.string(),
  sender: z.enum(["ai", "user", "system"]),
  avatar: z.string(),
  message: z.string(),
  timestamp: z.string(),
});

export const chatHistorySchema = z.object({
  messages: z.array(ChatMessageSchema),
});

export type ChatHistory = z.infer<typeof chatHistorySchema>;
export type ChatMessageType = z.infer<typeof ChatMessageSchema>;
