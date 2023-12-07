import type { Config } from "drizzle-kit";
export default {
  schema: "./libs/cake/db/src/schema",
  out: "./libs/cake/db/drizzle",
} satisfies Config;
