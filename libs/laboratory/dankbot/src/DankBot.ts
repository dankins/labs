import { ChatBot, ChatBotConfig } from "@danklabs/integrations/langchain";
import { RedisService } from "@danklabs/integrations/redis";

export const dankbotConfig: ChatBotConfig = {
  llm: {
    model: "openai",
    apiKey: "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",
  },
  persistence: {
    connector: "redis",
    keyspace: "chats",
    redis: new RedisService({ url: "redis://localhost:6379" }),
  },
};

export const DankBot = new ChatBot(dankbotConfig);
