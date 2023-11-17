import { ChatBot, ChatBotConfig } from "@danklabs/integrations/langchain";
import { RedisService } from "@danklabs/integrations/redis";

export const dankbotConfig: ChatBotConfig = {
  llm: {
    model: "openai",
    apiKey: process.env.OPENAPI_API_KEY!,
  },
  persistence: {
    connector: "redis",
    keyspace: "chats",
    redis: new RedisService({ url: process.env.REDIS_URL! }),
  },
};

export const DankBot = new ChatBot(dankbotConfig);
