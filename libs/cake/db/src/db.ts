import { sql } from "@vercel/postgres";
import {
  drizzle as VercelDrizzle,
  VercelPgDatabase,
} from "drizzle-orm/vercel-postgres";
import {
  drizzle as PostgresDrizzle,
  PostgresJsDatabase,
} from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

export let db:
  | PostgresJsDatabase<typeof schema>
  | VercelPgDatabase<typeof schema>;

if (process.env["POSTGRES_URL"]?.includes("localhost")) {
  const queryClient = postgres(process.env["POSTGRES_URL"]);
  db = PostgresDrizzle(queryClient, { schema });
} else {
  db = VercelDrizzle(sql, { schema });
}
