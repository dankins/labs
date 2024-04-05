import { QueryResult, sql } from "@vercel/postgres";
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

console.log("initializing database");
export let db:
  | PostgresJsDatabase<typeof schema>
  | VercelPgDatabase<typeof schema>;

if (process.env["POSTGRES_URL"]?.includes("localhost")) {
  let queryClient: postgres.Sql<{}>;
  if (!global.queryClient) {
    global.queryClient = postgres(process.env["POSTGRES_URL"]);
  }

  queryClient = global.queryClient;

  db = PostgresDrizzle(queryClient, { schema });
} else {
  db = VercelDrizzle(sql, { schema });
}

declare global {
  var queryClient: postgres.Sql<{}>;
}
