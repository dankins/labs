import { RedisClientType, createClient } from "redis";
import { ZodRawShape, z } from "zod";

let client: RedisClientType;
let connect: Promise<RedisClientType>;

export class RedisService {
  constructor(clientOptions: { url: string }) {
    if (!client) {
      client = createClient(clientOptions);
      connect = client.connect();
    }
  }

  async setJson<T extends ZodRawShape>(
    schema: z.ZodObject<T>,
    keyspace: string,
    key: string,
    data: any,
    path: string = "$"
  ): Promise<z.infer<typeof schema>> {
    schema.parse(data);
    const client = await connect;
    await client.json.set(`${keyspace}:${key}`, path, data);

    return data;
  }

  async getJson<T extends ZodRawShape>(
    schema: z.ZodObject<T>,
    keyspace: string,
    key: string
  ): Promise<z.infer<typeof schema> | null> {
    const client = await connect;
    const data = await client.json.get(`${keyspace}:${key}`);

    if (!data) {
      return null;
    }

    return schema.parse(data);
  }
}
