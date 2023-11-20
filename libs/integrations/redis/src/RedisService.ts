import { RedisClientType, createClient } from "redis";
import { ZodRawShape, z } from "zod";
import { kv, createClient as createVercelClient, VercelKV } from "@vercel/kv";

let client: RedisClientType | VercelKV;
let connect: Promise<unknown>;

export class RedisService {
  constructor(clientOptions: { url: string }) {
    console.log("RedisService redis");
    if (process.env["KV_REST_API_URL"] && process.env["KV_REST_API_TOKEN"]) {
      client = createVercelClient({
        url: process.env["KV_REST_API_URL"],
        token: process.env["KV_REST_API_TOKEN"],
      });
      connect = Promise.resolve();
      return;
    }
    if (!client) {
      client = createClient(clientOptions);
      connect = client.connect();

      connect
        .then((x) => console.log("connected"))
        .catch((err) => console.error("unable to connect to redis", err));
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
    await connect;
    await client.json.set(`${keyspace}:${key}`, path, data);

    return data;
  }

  async getJson<T extends ZodRawShape>(
    schema: z.ZodObject<T>,
    keyspace: string,
    key: string
  ): Promise<z.infer<typeof schema> | null> {
    await connect;
    const data = await client.json.get(`${keyspace}:${key}`);

    if (!data) {
      return null;
    }

    return schema.parse(data);
  }
}
