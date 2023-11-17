import { v4 as uuidv4 } from "uuid";

import { RedisService } from "@danklabs/integrations/redis";

import { ChatHistory, chatHistorySchema } from "../schemas";
import { IPersistence } from "./IPersistence";

export class RedisPersistence implements IPersistence {
  private redis: RedisService;
  private keyspace: string;
  constructor(redis: RedisService, keyspace: string) {
    this.redis = redis;
    this.keyspace = keyspace;
  }
  async bootstrapHistory(chatId: string): Promise<ChatHistory> {
    const history = {
      messages: [],
    };
    return this.redis.setJson(
      chatHistorySchema,
      this.keyspace,
      chatId,
      history
    );
  }

  async loadChatHistory(chatId: string): Promise<ChatHistory> {
    const history = await this.redis.getJson(
      chatHistorySchema,
      this.keyspace,
      chatId
    );

    if (!history) {
      return this.bootstrapHistory(chatId);
    }

    return history;
  }

  async saveMessage(
    chatId: string,
    sender: "ai" | "user" | "system",
    message: string
  ): Promise<string> {
    const history = await this.redis.getJson(
      chatHistorySchema,
      this.keyspace,
      chatId
    );

    if (!history) {
      throw new Error("unable to load chat history");
    }

    const messageId = uuidv4();
    const messageObject: ChatHistory["messages"][0] = {
      message,
      id: messageId,
      avatar: "",
      timestamp: new Date().getTime().toString(),
      sender,
    };

    history.messages.push(messageObject);

    await this.redis.setJson(chatHistorySchema, this.keyspace, chatId, history);

    return messageId;
  }
}
