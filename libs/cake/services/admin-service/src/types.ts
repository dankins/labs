import { db } from "@danklabs/cake/db";

export type DbTransactiontype = Parameters<
  Parameters<typeof db.transaction>[0]
>[0];
