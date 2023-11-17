import { RedisService } from "@danklabs/integrations/redis";

export interface ChatBotConfig {
  llm: {
    model: "openai";
    apiKey: string;
  };
  persistence: {
    connector: "redis";
    redis: RedisService;
    keyspace: string;
  };
}
